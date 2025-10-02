import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  inStock: boolean;
  discount?: number;
}

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string = '';
  searchTerm: string = '';
  sortBy: string = 'name';
  priceRange: { min: number; max: number } = { min: 0, max: 1000 };
  isLoading: boolean = false;

  categories = [
    {
      id: 'chicken',
      name: 'Chicken',
      image: 'assets/images/categories/country-queen.jpg',
    },
    {
      id: 'eggs',
      name: 'Eggs',
      image: 'assets/images/categories/original-country-chicken-eggs.jpg',
    },
    {
      id: 'mutton',
      name: 'Mutton',
      image: 'assets/images/categories/country-warrior.jpg',
    },
    { id: 'seafood', name: 'Seafood', image: 'assets/images/seafood.jpg' },
  ];

  // Sample products data
  sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Country King Chicken',
      price: 450,
      originalPrice: 500,
      image: 'assets/images/products/country-king-a.jpg',
      category: 'chicken',
      rating: 4.5,
      description: 'Fresh country chicken, naturally raised',
      inStock: true,
      discount: 10,
    },
    {
      id: 2,
      name: 'Country Queen Chicken',
      price: 380,
      originalPrice: 420,
      image: 'assets/images/products/country-king-b.jpg',
      category: 'chicken',
      rating: 4.3,
      description: 'Premium quality country chicken',
      inStock: true,
      discount: 9,
    },
    {
      id: 3,
      name: 'Fresh Country Eggs',
      price: 120,
      image: 'assets/images/eggs1.png',
      category: 'eggs',
      rating: 4.7,
      description: 'Farm fresh country chicken eggs - 12 pieces',
      inStock: true,
    },
    {
      id: 4,
      name: 'Kadaknath Chicken',
      price: 650,
      originalPrice: 700,
      image: 'assets/images/categories/kadaknath-country-chicken.jpg',
      category: 'chicken',
      rating: 4.8,
      description: 'Premium Kadaknath chicken, rich in nutrients',
      inStock: true,
      discount: 7,
    },
    {
      id: 5,
      name: 'Fresh Mutton',
      price: 850,
      image: 'assets/images/mutton.jpg',
      category: 'mutton',
      rating: 4.4,
      description: 'Fresh mutton cuts, premium quality',
      inStock: true,
    },
    {
      id: 6,
      name: 'Fresh Seafood Mix',
      price: 750,
      image: 'assets/images/seafood.jpg',
      category: 'seafood',
      rating: 4.2,
      description: 'Mixed seafood selection',
      inStock: true,
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.products = this.sampleProducts;
    this.route.params.subscribe((params) => {
      this.currentCategory = params['category'] || '';
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        !this.currentCategory || product.category === this.currentCategory;
      const matchesSearch =
        !this.searchTerm ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesPrice =
        product.price >= this.priceRange.min &&
        product.price <= this.priceRange.max;

      return matchesCategory && matchesSearch && matchesPrice;
    });

    this.sortProducts();
  }

  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  onSortChange(): void {
    this.sortProducts();
  }

  onPriceRangeChange(): void {
    this.filterProducts();
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    // Add cart logic here
  }

  getCategoryName(): string {
    const category = this.categories.find(
      (cat) => cat.id === this.currentCategory
    );
    return category ? category.name : 'All Products';
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('fa-star');
    }
    if (hasHalfStar) {
      stars.push('fa-star-half-o');
    }
    while (stars.length < 5) {
      stars.push('fa-star-o');
    }
    return stars;
  }
}
