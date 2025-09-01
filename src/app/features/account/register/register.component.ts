import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'cm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule]
})

export class RegisterComponent implements OnInit, OnDestroy {

  showRegisterForm = true;
  otpArray: string[] = ['', '', '', ''];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private router: Router) {}

  onInput(index: number): void {
    const input = this.otpInputs.toArray()[index].nativeElement;
    const nextInput = this.otpInputs.toArray()[index + 1]?.nativeElement;

    if (input.value && nextInput) {
      nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = this.otpInputs.toArray()[index].nativeElement;
    const prevInput = this.otpInputs.toArray()[index - 1]?.nativeElement;

    if (event.key === 'Backspace' && !input.value && prevInput) {
      prevInput.focus();
    }
  }

  verifyOTP(): void {
    const otp = this.otpArray.join('');
    console.log('Entered OTP:', otp);
    
    // Simple OTP validation - in real app, you'd verify with backend
    if (otp.length === 4) {
      console.log('Registration successful');
      // Navigate to home page after successful registration
      this.router.navigate(['/']);
    } else {
      alert('Please enter complete OTP');
    }
  }

  onRegisterClick () {
    this.showRegisterForm = false;
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
  

}