import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-payment.component.html',
  styleUrls: ['./wallet-payment.component.scss'],
})
export class WalletPaymentComponent {
  amount = 1000;

 paymentOptions = [
  { name: 'PhonePe UPI', icon: 'assets/phonepe.png' },
  { name: 'Google Pay', icon: 'assets/gpay.png' },
  { name: 'Amazon Pay', icon: 'assets/amazonpay.png' },
  { name: 'WhatsApp Pay', icon: 'assets/whatsapp.png' },
  { name: 'Slice Pay', icon: 'assets/slice.png' },
  { name: 'Add New UPI ID', icon: 'assets/upi.png', extra: '+' },
  { name: 'Credit / Debit Card', icon: 'assets/card.png', extra: '+' },
];


  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/wallet']);
  }
}
