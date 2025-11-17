import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  
  // ⭐ EXISTING + NEW ADDRESSES
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

  // ⭐ POPUP FORM CONTROL
  showForm = false;

  // ⭐ NEW ADDRESS MODEL
  newAddress = {
    label: '',
    details: '',
    icon: 'fa fa-map-marker',
  };

  constructor(private router: Router) {}

  // ⭐ OPEN FORM
  openAddAddressForm() {
    this.showForm = true;
  }

  // ⭐ CLOSE FORM
  closeAddAddressForm() {
    this.showForm = false;
    this.newAddress = {
      label: '',
      details: '',
      icon: 'fa fa-map-marker',
    };
  }

  // ⭐ ADD ADDRESS FUNCTION
  addAddress() {
    if (!this.newAddress.label || !this.newAddress.details) {
      alert('Please enter all fields');
      return;
    }

    this.addresses.push({ ...this.newAddress });

    this.closeAddAddressForm();
  }

  // ⭐ NAVIGATION
  goHome() {
    this.router.navigate(['/home']);
  }

  goBack() {
    window.history.back();
  }
}
