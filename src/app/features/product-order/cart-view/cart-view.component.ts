import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Cart Item Interface
export interface CartItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  maxQuantity?: number;
  weight?: string;
  unit?: string;
  category?: string;
  discount?: number;
  isAvailable: boolean;
}

// Coupon Interface
export interface Coupon {
  code: string;
  name: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrderValue?: number;
  maxDiscount?: number;
}

@Component({
  standalone: true,
  selector: 'cm-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class CartViewComponent implements OnInit, OnDestroy {
  // Cart data
  cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Country King Premium Chicken',
      description: 'Fresh country chicken, farm raised, antibiotic-free',
      image: '../../../../assets/images/products/ck/country-king-0.png',
      price: 450,
      originalPrice: 500,
      quantity: 1,
      maxQuantity: 10,
      weight: '1.1 - 1.5 kg',
      unit: 'kg',
      category: 'Chicken',
      discount: 10,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Country Leg Piece',
      description: 'Premium leg pieces, tender and juicy',
      image: '../../../../assets/images/products/kad/kadaknath-0.png',
      price: 350,
      originalPrice: 380,
      quantity: 2,
      maxQuantity: 15,
      weight: '500 - 700 gms',
      unit: 'pack',
      category: 'Chicken',
      discount: 8,
      isAvailable: true,
    },
  ];

  // Coupon data
  couponCode: string = '';
  appliedCoupon: Coupon | null = null;
  availableOffers: Coupon[] = [
    {
      code: 'FRESH10',
      name: 'Fresh Meat 10%',
      description: 'Get 10% off on fresh meat',
      discount: 10,
      type: 'percentage',
      minOrderValue: 500,
    },
    {
      code: 'NEWUSER',
      name: 'New User Special',
      description: '₹100 off for new customers',
      discount: 100,
      type: 'fixed',
      minOrderValue: 1000,
    },
    {
      code: 'BULK20',
      name: 'Bulk Order Discount',
      description: '20% off on orders above ₹2000',
      discount: 20,
      type: 'percentage',
      minOrderValue: 2000,
      maxDiscount: 500,
    },
  ];

  // Delivery and pricing
  deliveryCharges: number = 0; // Free delivery
  taxRate: number = 0.05; // 5% tax
  deliveryAddress: string = 'Whitefield, Bangalore - 560066';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Load cart data from service (mock data for now)
  loadCartData(): void {
    // In real implementation, load from cart service
    console.log('Cart data loaded');
  }

  // Track by function for ngFor performance
  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }

  // Quantity management
  increaseQuantity(item: CartItem): void {
    if (item.quantity < (item.maxQuantity || 99)) {
      item.quantity++;
      this.updateCartTotal();
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartTotal();
    }
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity >= 1 && quantity <= (item.maxQuantity || 99)) {
      item.quantity = quantity;
      this.updateCartTotal();
    }
  }

  // Item management
  removeItem(item: CartItem): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.updateCartTotal();
    }
  }

  saveForLater(item: CartItem): void {
    // Implement save for later functionality
    console.log('Saved for later:', item.name);
    // In real implementation, move to wishlist and remove from cart
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartItems = [];
      this.appliedCoupon = null;
      this.couponCode = '';
    }
  }

  // Coupon management
  applyCoupon(): void {
    const coupon = this.availableOffers.find(
      (offer) => offer.code.toLowerCase() === this.couponCode.toLowerCase()
    );

    if (coupon) {
      const subtotal = this.getSubtotal();
      if (subtotal >= (coupon.minOrderValue || 0)) {
        this.appliedCoupon = coupon;
        this.couponCode = '';
        console.log('Coupon applied:', coupon.name);
      } else {
        alert(
          `Minimum order value of ₹${coupon.minOrderValue} required for this coupon.`
        );
      }
    } else {
      alert('Invalid coupon code');
    }
  }

  applyOffer(offer: Coupon): void {
    const subtotal = this.getSubtotal();
    if (subtotal >= (offer.minOrderValue || 0)) {
      this.appliedCoupon = offer;
      console.log('Offer applied:', offer.name);
    } else {
      alert(
        `Minimum order value of ₹${offer.minOrderValue} required for this offer.`
      );
    }
  }

  removeCoupon(): void {
    this.appliedCoupon = null;
  }

  // Price calculations
  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + this.getItemTotal(item),
      0
    );
  }

  getCouponDiscount(): number {
    if (!this.appliedCoupon) return 0;

    const subtotal = this.getSubtotal();
    let discount = 0;

    if (this.appliedCoupon.type === 'percentage') {
      discount = (subtotal * this.appliedCoupon.discount) / 100;
      if (this.appliedCoupon.maxDiscount) {
        discount = Math.min(discount, this.appliedCoupon.maxDiscount);
      }
    } else {
      discount = this.appliedCoupon.discount;
    }

    return Math.min(discount, subtotal);
  }

  getTaxAmount(): number {
    const taxableAmount = this.getSubtotal() - this.getCouponDiscount();
    return Math.round(taxableAmount * this.taxRate);
  }

  getTotalAmount(): number {
    const subtotal = this.getSubtotal();
    const discount = this.getCouponDiscount();
    const tax = this.getTaxAmount();
    return subtotal - discount + tax + this.deliveryCharges;
  }

  getTotalSavings(): number {
    let savings = 0;

    // Savings from item discounts
    this.cartItems.forEach((item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        savings += (item.originalPrice - item.price) * item.quantity;
      }
    });

    // Savings from coupon
    savings += this.getCouponDiscount();

    // Delivery savings
    if (this.deliveryCharges === 0) {
      savings += 50; // Assume ₹50 standard delivery charge
    }

    return savings;
  }

  // Helper method to update cart totals
  private updateCartTotal(): void {
    // This would typically update the cart service
    console.log('Cart total updated');
  }

  // Navigation methods
  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }
    this.router.navigate(['/cart/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
