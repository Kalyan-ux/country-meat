import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eggs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eggs.component.html',
  styleUrl: './eggs.component.scss'
})
export class EggsComponent {
  
  title = 'Egg Products';
  
  // Premium egg products data
  eggProducts = [
    {
      id: 1,
      name: 'Farm Fresh Brown Eggs',
      price: 129,
      originalPrice: 149,
      image: 'assets/images/eggs.jpg',
      badge: 'BESTSELLER',
      rating: 4.9,
      reviews: 324,
      description: 'Premium farm fresh brown eggs from free-range hens. Rich in protein and omega-3.',
      features: ['Free Range', 'Organic Feed', 'Antibiotic Free'],
      packSize: '12 pieces'
    },
    {
      id: 2,
      name: 'Organic White Eggs',
      price: 99,
      originalPrice: 119,
      image: 'assets/images/eggs1.png',
      badge: 'ORGANIC',
      rating: 4.7,
      reviews: 267,
      description: 'Certified organic white eggs from cage-free chickens. Perfect for daily nutrition.',
      features: ['Certified Organic', 'Cage Free', 'Non-GMO Feed'],
      packSize: '10 pieces'
    },
    {
      id: 3,
      name: 'Country Fresh Eggs Tray',
      price: 189,
      originalPrice: 209,
      image: 'assets/images/eggs.jpg',
      badge: 'FAMILY PACK',
      rating: 4.8,
      reviews: 156,
      description: 'Large family pack of fresh country eggs. Great value for families.',
      features: ['Family Size', 'Fresh Daily', 'Village Sourced'],
      packSize: '18 pieces'
    },
    {
      id: 4,
      name: 'Premium Duck Eggs',
      price: 159,
      originalPrice: 179,
      image: 'assets/images/eggs1.png',
      badge: 'PREMIUM',
      rating: 4.6,
      reviews: 89,
      description: 'Rare premium duck eggs with rich flavor. Perfect for gourmet cooking.',
      features: ['Gourmet Quality', 'Rich Flavor', 'Limited Edition'],
      packSize: '6 pieces'
    }
  ];

  // Hero section data
  heroSection = {
    title: 'Country Egg Collection',
    subtitle: 'Farm Fresh • Organic • Naturally Nutritious',
    backgroundImage: 'assets/images/banner_image4.jpg'
  };

  onProductClick(productId: number) {
    console.log('Product clicked:', productId);
    // Add navigation logic to product details
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    console.log('Added to cart:', product);
    // Add to cart logic here
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
