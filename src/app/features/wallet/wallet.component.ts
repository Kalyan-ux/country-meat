import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  balance: number = 0.0;
  transactions: any[] = [];
  isAddMoneyOpen: boolean = false;

  amounts = [1000, 2000, 3000, 5000];
  selectedAmount = 1000;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
  goHome() {
  this.router.navigate(['/']);
}


  openAddMoney() {
    this.isAddMoneyOpen = true;
  }

  closeAddMoney() {
    this.isAddMoneyOpen = false;
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
  }

  addMoney() {
    this.balance += this.selectedAmount;
    this.transactions.unshift({
      amount: this.selectedAmount,
      type: 'credit',
      date: new Date().toLocaleDateString(),
    });
    if (this.transactions.length > 5) this.transactions.pop();
    this.closeAddMoney();
  }
  proceedToPayment() {
  this.closeAddMoney();
  this.router.navigate(['/wallet/payment']);
}

}
