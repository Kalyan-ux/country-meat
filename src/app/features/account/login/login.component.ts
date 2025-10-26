import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  mobileForm!: FormGroup;
  otpForm!: FormGroup;

  isOtpSent = false;
  cooldownTime = 30;
  resendDisabled = false;
  private countdownTimer: any;
  isLoading = false;

  message = '';
  messageType: 'success' | 'error' = 'success';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.initOtpForm();
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }

  private initOtpForm() {
    this.otpForm = this.fb.group({
      otp: this.fb.array(Array(6).fill('').map(() => this.fb.control('', [Validators.required, Validators.pattern(/^\d$/)])))
    });
  }

  get otpArray(): FormArray {
    return this.otpForm.get('otp') as FormArray;
  }

  // Cast AbstractControl[] to FormControl[] for template
  get otpControls(): FormControl[] {
    return this.otpArray.controls as FormControl[];
  }

  sendOtp(): void {
    if (this.isLoading || this.mobileForm.invalid) return;

    const mobile = this.mobileForm.value.mobile.trim();
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = users.find((u: any) => u.phone === mobile);

    if (!existingUser) {
      this.setMessage('Number not registered. Please register first.', 'error');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isOtpSent = true;
      this.otpArray.controls.forEach(ctrl => ctrl.setValue(''));
      this.startCooldownTimer();
      this.setMessage('OTP sent! Enter the 6-digit code.', 'success');

      setTimeout(() => {
        const firstInput = this.otpInputs.first;
        if (firstInput) firstInput.nativeElement.focus();
      }, 0);
    }, 1200);
  }

  verifyOtp(): void {
    if (this.otpForm.invalid) {
      this.setMessage('Please enter the complete 6-digit OTP.', 'error');
      return;
    }

    const finalOtp = this.otpArray.value.join('');
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      const mobile = this.mobileForm.value.mobile;
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = users.find((u: any) => u.phone === mobile);

      if (existingUser) {
        const currentUser = { name: existingUser.name, phone: existingUser.phone };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.authService.loginUser(currentUser.name);

        this.setMessage(`Welcome back, ${existingUser.name}!`, 'success');

        setTimeout(() => this.router.navigate(['/']), 1200);
      } else {
        this.setMessage('Number not registered. Please register first.', 'error');
      }
    }, 1500);
  }

  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');
    (this.otpArray.at(index) as FormControl).setValue(value, { emitEvent: false });

    // Move to next input
    if (value && index < this.otpArray.length - 1) {
      const next = this.otpInputs.toArray()[index + 1].nativeElement;
      next.focus();
      next.select();
    }

    // Backspace
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === 'Backspace' && !value && index > 0) {
      const prev = this.otpInputs.toArray()[index - 1].nativeElement;
      prev.focus();
      prev.select();
    }
  }

  startCooldownTimer(): void {
    this.cooldownTime = 30;
    this.resendDisabled = true;
    if (this.countdownTimer) clearInterval(this.countdownTimer);

    this.countdownTimer = setInterval(() => {
      if (this.cooldownTime > 0) this.cooldownTime--;
      else {
        clearInterval(this.countdownTimer);
        this.resendDisabled = false;
      }
    }, 1000);
  }

  resendOtp(event: Event): void {
    event.preventDefault();
    if (this.resendDisabled || this.isLoading) return;

    this.setMessage('OTP has been resent!', 'success');
    this.otpArray.controls.forEach(ctrl => ctrl.setValue(''));
    this.startCooldownTimer();

    setTimeout(() => {
      const firstInput = this.otpInputs.first;
      if (firstInput) firstInput.nativeElement.focus();
    }, 0);
  }

  goBackToMobileInput(): void {
    this.isOtpSent = false;
    this.otpArray.controls.forEach(ctrl => ctrl.setValue(''));
    this.clearMessage();
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private setMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
  }

  private clearMessage() {
    this.message = '';
  }
}
