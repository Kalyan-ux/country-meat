import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'cm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent implements OnInit, OnDestroy {
  // Form Fields
  name: string = '';
  mobile: string = '';

  otp: string[] = Array(6).fill('');
  isOtpSent: boolean = false;

  cooldownTime: number = 30;
  resendDisabled: boolean = false;
  private countdownTimer?: any;
  isLoading: boolean = false;

  // Inline Feedback
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  // ---------------- SEND OTP ----------------
  onRegisterSubmit(): void {
    if (this.isLoading) return;

    const trimmedName = this.name.trim();
    const trimmedMobile = this.mobile.trim();

    if (!trimmedName || !/^\d{10}$/.test(trimmedMobile)) {
      this.setMessage(
        'Please enter a valid name and 10-digit mobile number.',
        'error'
      );
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.isOtpSent = true;
      this.resetOtp();
      this.startCooldownTimer();
      this.clearMessage(); // Clear previous messages
    }, 1200);
  }

  // ---------------- VERIFY OTP ----------------
  onVerifyOtp(): void {
    const finalOtp = this.otp.join('');
    if (!/^\d{6}$/.test(finalOtp)) {
      this.setMessage('Please enter the complete 6-digit OTP.', 'error');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.saveUserToLocalStorage();
      this.authService.loginUser(this.name);

      // Show success message and wait before redirect
      this.setMessage(
        `Welcome, ${this.name}! Registration successful.`,
        'success'
      );

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000); // 3-second delay before redirect
    }, 1000);
  }

  // ---------------- LOCAL STORAGE ----------------
  private saveUserToLocalStorage(): void {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const existingUser = users.find((u: any) => u.phone === this.mobile);
    if (existingUser) {
      existingUser.name = this.name;
    } else {
      users.push({ name: this.name, phone: this.mobile });
    }

    localStorage.setItem('registeredUsers', JSON.stringify(users));
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ name: this.name, phone: this.mobile })
    );
  }

  // ---------------- RESEND OTP ----------------
  startCooldownTimer(): void {
    this.cooldownTime = 30;
    this.resendDisabled = true;
    this.clearCountdown();

    this.countdownTimer = setInterval(() => {
      if (this.cooldownTime > 0) {
        this.cooldownTime--;
      } else {
        this.clearCountdown();
        this.resendDisabled = false;
      }
    }, 1000);
  }

  resendOtp(event: Event): void {
    event.preventDefault();
    if (this.resendDisabled || this.isLoading) return;

    this.resetOtp();
    this.startCooldownTimer();
    this.setMessage(`New OTP sent to ${this.mobile}`, 'success');
  }

  private clearCountdown(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = undefined;
    }
  }

  // ---------------- OTP INPUT ----------------
  onDigitInput(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (value.length > 1) {
      value = value.charAt(0);
      input.value = value;
    }

    this.otp[index] = value;

    if (value && index < this.otp.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    if (event.key === 'Backspace' && !value && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  private resetOtp(): void {
    this.otp = Array(6).fill('');
    this.otpInputs?.forEach((input) => (input.nativeElement.value = ''));
  }

  // ---------------- NAVIGATION ----------------
  goBackToDetails(): void {
    this.isOtpSent = false;
    this.resetOtp();
    this.clearCountdown();
    this.clearMessage();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  // ---------------- MESSAGE HANDLERS ----------------
  private setMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
  }

  private clearMessage() {
    this.message = '';
  }
}
