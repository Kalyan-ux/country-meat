import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chicken',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chicken.component.html',
  styleUrl: './chicken.component.scss',
})
export class ChickenComponent implements OnInit {
  title = 'Chicken Products';

  chickenProducts: any[] = [];

  // Hero section data
  heroSection = {
    title: 'Country Chicken Collection',
    subtitle: 'Farm Fresh • Naturally Raised • Premium Quality',
    backgroundImage: 'assets/images/banner_image3.jpg',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // MODIFIED: Initialize products with a quantity property
    const initialProducts = [
      {
        id: 1,
        name: 'Country King',
        subtitle: 'Original Nati Hunja/Punju/Seval/Desi rooster',
        age: 'Age: 7-10 months',
        price: 2000,
        originalPrice: 2000,
        weight: '1100 – 1250 g',
        image: 'assets/images/products/ck/country-king-0.png',
        reviews: 189,
        specialBadge: "Country Meat's Special",
        description:
          'Country King (Desi Rooster, Nati Koli, Hunja, Punju, Seval) aged 7-10 months. Naturally hatched, free-range, antibiotic-free, and fed on grains, millets, greens, and insects for superior taste, texture, and health benefits.',
        features: [
          'Antibiotic-Free',
          'Free-Range',
          'Naturally-Hatched',
          'Native',
          'Organic',
        ],
      },
      {
        id: 2,
        name: 'Country Queen',
        subtitle: 'Original Nati Yate / Petta / Potte Koli / Desi hen',
        age: 'Age: 6-8 months',
        price: 2000,
        originalPrice: 2000,
        weight: '1000 – 1150 g',
        image: 'assets/images/products/cq/country-queen-0.png',
        reviews: 156,
        specialBadge: "Country Meat's Special",
        description:
          'Country Queen (Desi Hen, Nati Koli, Yaate, Petta) aged 5-7 months. Naturally raised with a superior protein-to-fat ratio, rich in calcium, phosphorus, and omega-3s for long-term health benefits.',
        features: [
          'Nutritious',
          'Protein-Rich',
          'Omega-3',
          'Low-Fat',
          'Micronutrients',
        ],
      },
      {
        id: 3,
        name: 'Country Warrior Chicken',
        subtitle: 'Original Fighter Koli / Pandyam kodi / Sandekozi',
        age: 'Age: 5-6 months',
        price: 849,
        originalPrice: 2000,
        weight: '800 – 950 g',
        image: 'assets/images/products/cw/country-warrior-0.png',
        reviews: 203,
        specialbadge: "Country Meat's Special",
        description:
          'Country Warrior (Aseel, Pandyam Kodi, Fighter Koli, Peruvidai) aged 5-6 months. 100% natural, free-range, and fed on grains, greens, and insects for superior taste, texture, and nutrition.',
        features: [
          'Natural',
          'Free-Range',
          'Nutritious',
          'Flavorful',
          'Micronutrients',
        ],
      },
      {
        id: 4,
        name: 'Kadaknath Country Chicken',
        subtitle: 'Kaala Masi / Kadaknath',
        age: 'Age: 5-6 months',
        price: 1050,
        originalPrice: 1150,
        weight: '900 – 1100 g',
        image: 'assets/images/products/kad/kadaknath-0.png',
        reviews: 245,
        description:
          'Kadaknath (Kaali Masi) country chicken, aged 5-6 months. Known for its black meat, high protein content, and rich health benefits.',
        features: [
          '100% Natural & Antibiotic-Free',
          'Grown Free-Range',
          'Nutritious Feed',
        ],
      },
      {
        id: 5,
        name: 'Tender Country Chicken',
        subtitle: 'Village Nati Koli, Mysore Queen, Sonali',
        age: 'Age: 3-4 months',
        price: 619,
        originalPrice: 2000,
        weight: '600 – 750 g',
        image: 'assets/images/products/tc/tender-country-0.png',
        reviews: 203,
        description:
          'Tender Country Chicken (Village Nati Koli, Mysore Queen, Sonali) aged 3-4 months. 100% natural, free-range, and fed on grains, greens, and occasional commercial feed, offering soft, tender, and flavorful meat.',
        features: [
          'Natural',
          'Free-Range',
          'Nutritious',
          'Tender',
          'Flavorful',
        ],
      },
    ];

    this.chickenProducts = initialProducts.map((p) => ({ ...p, quantity: 0 }));
  }

  onProductClick(productId: number) {
    this.router.navigate(['products/product-details'], {
      queryParams: { id: productId },
    });
  }

  // ADDED: Logic to handle adding to cart
  addToCart(product: any, event: Event) {
    event.stopPropagation();
    product.quantity = 1;
    console.log('Added to cart:', product);
  }

  // ADDED: Logic to increase quantity
  increaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    product.quantity++;
  }

  // ADDED: Logic to decrease quantity
  decreaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
