import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // MODIFIED: Imported OnInit
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-eggs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eggs.component.html',
  styleUrl: './eggs.component.scss',
})
export class EggsComponent implements OnInit {
  title = 'EggProducts';

  // Note to be shared across all egg products
  eggNote =
    'The color of country eggs may vary depending on the breed of the hen. The color of the eggshell has no impact on the taste, nutritional value or the quality of the egg.';

  initialEggProducts = [
    {
      id: 1,
      name: 'Free Range Original Country Chicken Eggs',
      description:
        'These Country Eggs are laid by rare original native Country Hens (Country Queen) — naturally hatched and lovingly raised in open free-range farms.',
      price: 180,
      originalPrice: 180, // ADDED
      packOptions: [
        { label: 'Pack of 6', price: 180 },
        { label: 'Pack of 12', price: 360 },
      ],
      image: 'assets/images/products/eggs/egg-2.png',
      features: [
        'Protein Rich',
        'Packed with Minerals',
        'Low-Fat',
        'High Omega-3',
        'Free Range',
        'Packed with Vitamins',
      ],
      note: this.eggNote,
    },
    {
      id: 2,
      name: 'Free Range Country Chicken Eggs',
      description:
        'These Country Eggs are laid by breeds like sonali raised in open free-range farms. Pure, wholesome, and rich in nutrition, just the way nature intended.',
      price: 119,
      originalPrice: 119, // ADDED
      packOptions: [
        { label: 'Pack of 6', price: 119 },
        { label: 'Pack of 12', price: 239 },
        { label: 'Pack of 30', price: 594 },
      ],
      image: 'assets/images/products/eggs/egg-1.png',
      features: [
        'Protein Rich',
        'Nutritious',
        'Chemical-free',
        'Omega-3',
        'Free-Range',
      ],
      note: this.eggNote,
    },
    {
      id: 3,
      name: 'Cage Free Country Chicken Eggs',
      description:
        'These Country Eggs are laid by breeds like sonali & Aseel raised out of battery cages. Known for their balanced nutrition and authentic taste.',
      price: 99,
      originalPrice: 99, // ADDED
      packOptions: [
        { label: 'Pack of 6', price: 99 },
        { label: 'Pack of 12', price: 195 },
        { label: 'Pack of 30', price: 489 },
      ],
      image: 'assets/images/products/eggs/egg-3.png',
      features: [
        'Protein Rich',
        'Nutritious',
        'Chemical-free',
        'Better fat profile',
      ],
      note: this.eggNote,
    },
  ];

  constructor(private router: Router) {}

  eggProducts: any[] = []; // This will hold the products with quantities

  heroSection = {
    title: 'Country Egg Collection',
    subtitle: 'Farm Fresh • Organic • Naturally Nutritious',
    backgroundImage: 'assets/images/banner_image4.jpg',
  };

  ngOnInit(): void {
    this.eggProducts = this.initialEggProducts.map((p) => ({
      ...p,
      quantity: 0,
    }));
  }

  onProductClick(productId: number) {
    this.router.navigate(['products/product-details-eggs'], {
      queryParams: { id: productId },
    });
  }

  getDiscount(originalPrice: number, currentPrice: number): number {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice)
      return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    product.quantity = 1;
  }

  increaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    product.quantity++;
  }

  decreaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  onPackChange(product: any, event: Event): void {
    event.stopPropagation();
    const selectedPrice = (event.target as HTMLSelectElement).value;
    product.price = Number(selectedPrice);
  }
}
