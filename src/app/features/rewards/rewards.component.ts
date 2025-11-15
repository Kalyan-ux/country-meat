import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  userName: string = 'User'; // default fallback
  eggs = Array(5).fill(1);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Fetch the logged-in user details from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // ✅ If found, update userName
    if (currentUser && currentUser.name) {
      this.userName = currentUser.name;
    } else {
      this.userName = 'Guest'; // fallback
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goToTerms() {
    this.router.navigate(['/terms-and-conditions']);
  }
}
