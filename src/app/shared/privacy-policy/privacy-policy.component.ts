import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
=======
>>>>>>> updates

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
<<<<<<< HEAD
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
  styleUrls: ['./privacy-policy.component.scss']
=======
  styleUrl: './privacy-policy.component.scss'
>>>>>>> updates
})
export class PrivacyPolicyComponent {

}
