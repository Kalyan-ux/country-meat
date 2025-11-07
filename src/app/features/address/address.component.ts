import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  addresses = [
    {
      label: 'Home',
      icon: 'fa fa-home',
      details:
        'Flat 203, Lakshmi Residency, Road No. 4, Banjara Hills, Bangalore, Karnataka – 500034',
    },
    {
      label: 'Work',
      icon: 'fa fa-briefcase',
      details:
        'Flat 203, Lakshmi Residency, Road No. 4, Banjara Hills, Bangalore, Karnataka – 500034',
    },
    {
      label: 'Dilip',
      icon: 'fa fa-users',
      details:
        'Flat 203, Lakshmi Residency, Road No. 4, Banjara Hills, Bangalore, Karnataka – 500034',
    },
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Adjust navigation as needed
  }

  addNewAddress() {
    alert('Add new address clicked!');
    // You can navigate to a form or open a modal later
  }
}
