import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'cm-home-newsletter',
  templateUrl: './home-newsletter.component.html',
  styleUrls: ['./home-newsletter.component.scss'],
  imports: [CommonModule, FormsModule]
})

export class HomeNewsletterComponent implements OnInit, OnDestroy {
  email: string = '';
  isSubmitting: boolean = false;
  isSuccess: boolean = false;
  toasts: any[] = [];

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  onSubscribe(): void {
    // Validate email first
    if (!this.email || this.email.trim() === '') {
      this.showToast('Please enter your email address', 'error');
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.showToast('Please enter a valid email address', 'error');
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call with timeout
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      
      // Show success toast
      this.showToast('Email sent successfully! Welcome to our newsletter.', 'success');

      // Reset form after 3 seconds
      setTimeout(() => {
        this.isSuccess = false;
        this.email = '';
      }, 3000);

    }, 2000); // 2 second delay to simulate network request
  }

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    const toast = {
      id: Date.now(),
      message,
      type,
      show: false
    };

    this.toasts.push(toast);

    // Trigger animation
    setTimeout(() => {
      toast.show = true;
    }, 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 4000);
  }

  removeToast(id: number): void {
    const toastIndex = this.toasts.findIndex(toast => toast.id === id);
    if (toastIndex > -1) {
      this.toasts[toastIndex].show = false;
      
      // Remove from array after animation completes
      setTimeout(() => {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
      }, 300);
    }
  }
}