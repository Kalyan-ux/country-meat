import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderDate: Date;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  estimatedDelivery: Date;
  status: string;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  order: Order | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];
      if (orderId) {
        this.loadOrderDetails(orderId);
      } else {
        this.loadMockOrder();
      }
    });
  }

  private loadOrderDetails(orderId: string): void {
    // Simulate API call
    setTimeout(() => {
      this.order = this.getMockOrder(orderId);
      this.isLoading = false;
    }, 1500);
  }

  private loadMockOrder(): void {
    setTimeout(() => {
      this.order = this.getMockOrder('CM' + Date.now().toString().slice(-6));
      this.isLoading = false;
    }, 1500);
  }

  private getMockOrder(orderId: string): Order {
    return {
      id: orderId,
      orderDate: new Date(),
      items: [
        {
          id: 1,
          name: 'Country King Chicken',
          price: 450,
          quantity: 1,
          image: 'assets/images/products/country-king-a.jpg'
        },
        {
          id: 2,
          name: 'Fresh Country Eggs',
          price: 120,
          quantity: 2,
          image: 'assets/images/eggs1.png'
        }
      ],
      subtotal: 690,
      deliveryFee: 50,
      discount: 40,
      total: 700,
      deliveryAddress: {
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '123 Main Street, Near Park',
        city: 'Bangalore',
        pincode: '560001'
      },
      paymentMethod: 'Cash on Delivery',
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      status: 'confirmed'
    };
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  trackOrder(): void {
    this.router.navigate(['/order-tracking', this.order?.id]);
  }

  downloadInvoice(): void {
    console.log('Downloading invoice for order:', this.order?.id);
    // Implement invoice download logic
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
