import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'cm-product-quantity-input',
  templateUrl: './product-quantity-input.component.html',
  styleUrls: ['./product-quantity-input.component.scss'],
  imports: [FormsModule]
})

export class ProductQuantityInputComponent implements OnInit, OnDestroy {
  
  quantity: number = 1;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}