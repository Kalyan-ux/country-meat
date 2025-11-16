import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refer-friend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.scss']
})
export class ReferFriendComponent implements OnInit {
  userName: string = 'User';
  referralCode: string = 'CM12345'; // Later, fetch dynamically from API

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Get current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // ✅ If a valid user exists, set their name
    if (currentUser && currentUser.name) {
      this.userName = currentUser.name;
    } else {
      this.userName = 'Guest'; // Fallback if no user found
    }
  }


goHome() {
  this.router.navigate(['/home']);
}

goBack() {
  window.history.back();
}
  shareReferral() {
    const referralLink = `https://countrymeat.com/signup?ref=${this.referralCode}`;
    const message = `Hey! ${this.userName} invites you to get fresh farm meat from Country Meat 🥩. Use my referral code ${this.referralCode} to sign up! ${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: 'Join Country Meat',
        text: message,
        url: referralLink
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  }
}
