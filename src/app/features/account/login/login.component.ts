import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  mobile: string = '';

  constructor(private router: Router) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onLogin(): void {
    // Simple validation - in real app, you'd have proper authentication
    if (this.mobile && this.mobile.length >= 10) {
      // Simulate successful login and navigate to home
      console.log('Login successful for mobile:', this.mobile);
      this.router.navigate(['/']);
    } else {
      alert('Please enter a valid mobile number');
    }
  }
}
