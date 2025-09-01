import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface OrderStatus {
  status: string;
  title: string;
  description: string;
  timestamp?: Date;
  isCompleted: boolean;
  isActive: boolean;
}

interface TrackingOrder {
  id: string;
  orderDate: Date;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  totalAmount: number;
  paymentMethod: string;
  estimatedDelivery: Date;
  currentStatus: string;
  statusHistory: OrderStatus[];
}

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  order: TrackingOrder | null = null;
  isLoading: boolean = false;
  searchOrderId: string = '';
  searchError: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];
      if (orderId) {
        this.searchOrderId = orderId;
        this.trackOrder();
      }
    });
  }

  trackOrder(): void {
    if (!this.searchOrderId.trim()) {
      this.searchError = 'Please enter a valid order ID';
      return;
    }

    this.isLoading = true;
    this.searchError = '';

    // Simulate API call
    setTimeout(() => {
      this.order = this.getMockOrderTracking(this.searchOrderId);
      this.isLoading = false;
      
      if (!this.order) {
        this.searchError = 'Order not found. Please check your order ID and try again.';
      }
    }, 1500);
  }

  private getMockOrderTracking(orderId: string): TrackingOrder | null {
    // Simulate order lookup
    if (orderId.length < 3) {
      return null;
    }

    const orderStatuses: OrderStatus[] = [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Your order has been placed successfully',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        isCompleted: true,
        isActive: false
      },
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        isCompleted: true,
        isActive: false
      },
      {
        status: 'preparing',
        title: 'Preparing Order',
        description: 'Your fresh products are being prepared with care',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isCompleted: true,
        isActive: false
      },
      {
        status: 'packed',
        title: 'Order Packed',
        description: 'Your order has been packed and ready for dispatch',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        isCompleted: true,
        isActive: true
      },
      {
        status: 'dispatched',
        title: 'Order Dispatched',
        description: 'Your order is on the way to your location',
        isCompleted: false,
        isActive: false
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Your order has been delivered successfully',
        isCompleted: false,
        isActive: false
      }
    ];

    return {
      id: orderId,
      orderDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      customerName: 'John Doe',
      customerPhone: '+91 9876543210',
      deliveryAddress: '123 Main Street, Near Park, Bangalore - 560001',
      totalAmount: 700,
      paymentMethod: 'Cash on Delivery',
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      currentStatus: 'packed',
      statusHistory: orderStatuses
    };
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  callSupport(): void {
    window.location.href = 'tel:+918012345678';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  clearSearch(): void {
    this.searchOrderId = '';
    this.order = null;
    this.searchError = '';
  }
}
