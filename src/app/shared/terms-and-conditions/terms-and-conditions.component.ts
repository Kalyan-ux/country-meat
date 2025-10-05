import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  terms = [
    {
      title: 'Introduction',
      content: 'Welcome to Country Meat. By using our website or app, you agree to these terms and conditions.'
    },
    {
      title: 'Use of Platform',
      content: 'You must follow all applicable laws and not misuse our services in any way.'
    },
    {
      title: 'Orders & Payments',
      content: 'Orders are confirmed after payment. Prices are subject to change without notice.'
    },
    {
      title: 'Privacy',
      content: 'Your personal information is handled according to our Privacy Policy.'
    },
    {
      title: 'Liability',
      content: 'Country Meat is not liable for damages resulting from use of the platform.'
    },
    {
      title: 'Changes to Terms',
      content: 'We may update terms at any time. Continued use indicates acceptance.'
    }
  ];
}
