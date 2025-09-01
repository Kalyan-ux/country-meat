import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Define interfaces for the product data structure
interface ProductVariants {
  types?: string[];
  cuts?: string[];
  quantities?: string[];
}

interface ProductImages {
  main: string;
  gallery: string[];
}

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  weight?: string;
  quantity?: string;
  grossWeight?: string;
  netWeight?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  images: ProductImages;
  variants?: ProductVariants;
  features?: string[];
  deliveryInfo?: string;
  storageInfo?: string;
  nutritionPer100g?: { [key: string]: string };
}

interface SelectedVariant {
  type?: string;
  cut?: string;
  quantity?: string;
}

@Component({
  standalone: true,
  selector: 'cm-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @Input() rating = 0;
  @Input() maxRating = 5;
  @Output() ratingChange = new EventEmitter<number>();

  // Product data - PUBLIC PROPERTIES
  product: Product | null = null;
  isLoading = true;
  
  // Image selection - PUBLIC PROPERTIES
  selectedImage = '';
  
  // Variants and quantity - PUBLIC PROPERTIES
  selectedVariant: SelectedVariant = {};
  selectedQuantity = 1;
  
  // UI states - PUBLIC PROPERTIES
  showReviewForm = false;
  showWriteReviewBtn = true;
  showCancelReviewBtn = false;
  showReviews = false;
  showNutritionFacts = false;
  
  // Related products - PUBLIC PROPERTY
  relatedProducts: Product[] = [];

  // Hover rating for star display
  hoverRating = 0;

  constructor() {
    // Initialize component
  }

  ngOnInit(): void {
    // Load product data based on route parameter
    this.loadProductData();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Rating methods
  onWriteReviewClick(): void {
    this.showReviewForm = true;
    this.showWriteReviewBtn = false;
    this.showCancelReviewBtn = true;
  }

  onCancelReviewClick(): void {
    this.showReviewForm = false;
    this.showWriteReviewBtn = true;
    this.showCancelReviewBtn = false;
  }

  setRating(value: number): void {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  setHover(value: number): void {
    this.hoverRating = value;
  }

  resetHover(): void {
    this.hoverRating = 0;
  }

  // Image selection methods
  selectImage(image: string): void {
    this.selectedImage = image;
  }

  // Star rating helper
  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  // Availability status helper
  getAvailabilityStatus(): { class: string; icon: string; text: string } {
    if (!this.product) {
      return { class: 'out-of-stock', icon: 'fas fa-times-circle', text: 'Out of Stock' };
    }
    
    switch (this.product.availability) {
      case 'in-stock':
        return { class: 'in-stock', icon: 'fas fa-check-circle', text: 'In Stock' };
      case 'limited':
        return { class: 'limited-stock', icon: 'fas fa-exclamation-circle', text: 'Limited Stock' };
      default:
        return { class: 'out-of-stock', icon: 'fas fa-times-circle', text: 'Out of Stock' };
    }
  }

  // Toggle methods
  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }

  toggleNutritionFacts(): void {
    this.showNutritionFacts = !this.showNutritionFacts;
  }

  // Quantity management
  updateQuantity(change: number): void {
    const newQuantity = this.selectedQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.selectedQuantity = newQuantity;
    }
  }

  // Cart and purchase methods
  addToCart(): void {
    if (this.product) {
      console.log('Adding to cart:', {
        product: this.product,
        quantity: this.selectedQuantity,
        variant: this.selectedVariant
      });
      // TODO: Implement cart service integration
      alert('Product added to cart!');
    }
  }

  buyNow(): void {
    if (this.product) {
      console.log('Buy now:', {
        product: this.product,
        quantity: this.selectedQuantity,
        variant: this.selectedVariant
      });
      // TODO: Implement direct purchase logic
      alert('Proceeding to checkout!');
    }
  }

  private loadProductData(): void {
    // Mock data for now - replace with actual service call
    setTimeout(() => {
      this.product = {
        id: '1',
        name: 'Premium Chicken Breast',
        shortDescription: 'Fresh, tender chicken breast perfect for all cooking methods',
        description: 'Our premium chicken breast is sourced from free-range farms and is perfect for grilling, baking, or pan-frying. High in protein and low in fat, this premium cut is ideal for health-conscious consumers who want quality meat for their meals.',
        category: 'chicken',
        price: 299,
        originalPrice: 349,
        discount: 15,
        weight: '500g',
        grossWeight: '520g',
        netWeight: '500g',
        tags: ['Fresh', 'Premium', 'Protein Rich', 'Free Range'],
        rating: 4.5,
        reviewCount: 124,
        availability: 'in-stock',
        images: {
          main: 'assets/images/products/chicken-breast-main.jpg',
          gallery: [
            'assets/images/products/chicken-breast-1.jpg',
            'assets/images/products/chicken-breast-2.jpg',
            'assets/images/products/chicken-breast-3.jpg',
            'assets/images/products/chicken-breast-4.jpg'
          ]
        },
        variants: {
          types: ['Fresh', 'Frozen'],
          cuts: ['Whole', 'Boneless', 'With Bone'],
          quantities: ['250g', '500g', '1kg', '2kg']
        },
        features: [
          'High Protein Content',
          'Low Fat',
          'Free Range',
          'Antibiotic Free',
          'Fresh Daily',
          'Premium Quality'
        ],
        deliveryInfo: 'Same day delivery available for orders before 2 PM. Free delivery on orders above ₹500.',
        storageInfo: 'Store in refrigerator at 0-4°C. Use within 2 days of purchase. Can be frozen for up to 3 months.',
        nutritionPer100g: {
          calories: '165',
          protein: '31g',
          fat: '3.6g',
          carbohydrates: '0g',
          fiber: '0g',
          sodium: '74mg',
          cholesterol: '85mg',
          iron: '0.9mg'
        }
      };
      
      this.selectedImage = this.product.images.main;
      this.isLoading = false;
      
      // Load related products
      this.loadRelatedProducts();
    }, 1000);
  }

  private loadRelatedProducts(): void {
    // Mock related products data
    this.relatedProducts = [
      {
        id: '2',
        name: 'Chicken Thigh',
        shortDescription: 'Juicy chicken thigh pieces',
        description: 'Tender and flavorful chicken thigh pieces',
        category: 'chicken',
        price: 249,
        originalPrice: 279,
        discount: 10,
        weight: '500g',
        tags: ['Fresh', 'Juicy'],
        rating: 4.2,
        reviewCount: 89,
        availability: 'in-stock',
        images: {
          main: 'assets/images/products/chicken-thigh.jpg',
          gallery: []
        }
      },
      {
        id: '3',
        name: 'Country Eggs',
        shortDescription: 'Fresh organic eggs',
        description: 'Farm fresh organic eggs',
        category: 'eggs',
        price: 120,
        originalPrice: 140,
        discount: 14,
        weight: '12 pieces',
        tags: ['Organic', 'Fresh'],
        rating: 4.8,
        reviewCount: 156,
        availability: 'in-stock',
        images: {
          main: 'assets/images/products/eggs.jpg',
          gallery: []
        }
      }
    ];
  }
}