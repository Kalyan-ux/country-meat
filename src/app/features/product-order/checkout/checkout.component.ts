import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'cm-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})

export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
  }

  // Method to handle order placement
  placeOrder(): void {
    // Simulate order processing
    const orderId = 'CM' + Date.now().toString().slice(-6);
    
    // Redirect to order confirmation
    this.router.navigate(['/order-confirmation', orderId]);
  }

}