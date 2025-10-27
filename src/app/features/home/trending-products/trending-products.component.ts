import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'cm-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class TrendingProductsComponent {
  // Data for trending products, structured like the chicken component
  InitialTrendingProducts = [
    {
      id: 1,
      name: 'Country King',
      subtitle: 'Original Nati Hunja/Punju/Seval/Desi rooster',
      age: 'Age: 7-10 months',
      productType: 'chicken', // ADDED: Identifier for routing
      price: 2000,
      originalPrice: 2000,
      weight: '1100 – 1250 g',
      image: 'assets/images/products/ck/country-king-0.png',
      specialBadge: "Country Meat's Special",
      features: [
        'Naturally-Hatched',
        'Naturally-fed',
        'Free-Range',
        'Anti-biotic residue Free',
      ],
    },
    {
      id: 2,
      name: 'Country Queen',
      subtitle: 'Original Nati Yate / Petta / Potte Koli / Desi hen',
      age: 'Age: 6-8 months',
      productType: 'chicken', // ADDED: Identifier for routing
      price: 2000,
      originalPrice: 2000,
      weight: '1000 – 1150 g',
      image: 'assets/images/products/cq/country-queen-0.png',
      specialBadge: "Country Meat's Special",
      features: [
        'Naturally-Hatched',
        'Naturally-fed',
        'Free-Range',
        'Anti-biotic residue Free',
      ],
    },
    {
      id: 3,
      name: 'Country Eggs',
      subtitle: 'Fresh Eggs',
      age: 'Daily Collection',
      productType: 'eggs', // ADDED: Identifier for routing
      price: 180,
      originalPrice: 180,
      weight: '6 Pieces',
      image: 'assets/images/products/eggs/egg-1.png',
      features: [
        'Protein rich',
        'Free-Range',
        'High Omega-3',
        'Low-fat',
        'Packed with Vitamins & minerals',
      ],
    },
  ];

  TrendingProducts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() : void {
  this.TrendingProducts = this.InitialTrendingProducts.map((p) => ({
      ...p,
      quantity:0,
    }));
  }

  // MODIFIED: Navigate to the correct component based on productType
  onProductClick(productId: number, productType: string) {
    let routePath = '';
    if (productType === 'eggs') {
        routePath = 'products/product-details-eggs';
    } else {
        // Default to the main product details for chicken/meat
        routePath = 'products/product-details';
    }

    this.router.navigate([routePath], {
      queryParams: { id: productId },
    });
  }
  
  // Helper function to calculate discount
  getDiscount(originalPrice: number, currentPrice: number): number {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice)
      return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  // Add to cart logic
  addToCart(product: any, event: Event) {
    event.stopPropagation();
    product.quantity=1;
  }

increaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    product.quantity ++;
  }

  decreaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    if (product.quantity > 0) {
      product.quantity --;
    }
  }
}
