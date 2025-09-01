import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chicken',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chicken.component.html',
  styleUrl: './chicken.component.scss'
})
export class ChickenComponent {

  title = 'Chicken Products';

  // Premium chicken products data
chickenProducts = [
  {
  id: 1,
  name: 'Country King',
  price: 1199,
  originalPrice: 2000,
  image: 'assets/images/products/country_king.png',
  badge: 'PREMIUM',
  rating: 4.9,
  reviews: 189,
  description: 'Country King (Desi Rooster, Nati Koli, Hunja, Punju, Seval) aged 7-10 months. Naturally hatched, free-range, antibiotic-free, and fed on grains, millets, greens, and insects for superior taste, texture, and health benefits.',
  features: [
    'Antibiotic-Free',
    'Free-Range',
    'Naturally-Hatched',
    'Native',
    'Organic'
    ]
  },
  {
  id: 2,
  name: 'Country Queen',
  price: 999,
  originalPrice: 2000,
  image: 'assets/images/products/country_queen.png',
  badge: 'FRESH',
  rating: 4.7,
  reviews: 156,
  description: 'Country Queen (Desi Hen, Nati Koli, Yaate, Petta) aged 5-7 months. Naturally raised with a superior protein-to-fat ratio, rich in calcium, phosphorus, and omega-3s for long-term health benefits.',
  features: [
    'Nutritious',
    'Protein-Rich',
    'Omega-3',
    'Low-Fat',
    'Micronutrients',
    ]
  },
{
  id: 3,
  name: 'Country Warrior Chicken',
  price: 849,
  originalPrice: 2000,
  image: 'assets/images/products/Country_Warrior.png',
  badge: 'OFFER',
  rating: 4.6,
  reviews: 203,
  description: 'Country Warrior (Aseel, Pandyam Kodi, Fighter Koli, Peruvidai) aged 5-6 months. 100% natural, free-range, and fed on grains, greens, and insects for superior taste, texture, and nutrition.',
  features: [
    'Natural',
    'Free-Range',
    'Nutritious',
    'Flavorful',
      ]
  },
  {
    id: 4,
    name: 'Kadaknath Country Chicken',
    price: 1050,
    originalPrice: 1150,
    image: 'assets/images/Kadaknath.png',
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 245,
    description: 'Kadaknath (Kaali Masi) country chicken, aged 5-6 months. Known for its black meat, high protein content, and rich health benefits.',
    features: [
      '100% Natural & Antibiotic-Free',
      'Grown Free-Range',
      'Nutritious Feed'
    ],
    age: '5-6 Months'
  },
{
  id: 5,
  name: 'Tender Country Chicken',
  price: 619,
  originalPrice: 2000,
  image: 'assets/images/products/Tender_Country.png',
  badge: 'OFFER',
  rating: 4.6,
  reviews: 203,
  description: 'Tender Country Chicken (Village Nati Koli, Mysore Queen, Sonali) aged 3-4 months. 100% natural, free-range, and fed on grains, greens, and occasional commercial feed, offering soft, tender, and flavorful meat.',
  features: [
    'Natural',
    'Free-Range',
    'Nutritious',
    'Tender',
    'Flavorful'
    ]
  }
  ];

  // Hero section data
  heroSection = {
    title: 'Country Chicken Collection',
    subtitle: 'Farm Fresh • Naturally Raised • Premium Quality',
    backgroundImage: 'assets/images/banner_image3.jpg'
  };
  router: any;

  onProductClick(productId: number) {
    this.router.navigate(['/src/app/features/product-details', productId]);    // Add navigation logic to product details
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
