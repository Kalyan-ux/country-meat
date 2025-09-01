import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ProductQuantityInputComponent } from "../../shared/components/product-quantity-input/product-quantity-input.component";
import { ProductRatingsComponent } from "../../shared/components/product-ratings/product-ratings.component";

@Component({
  standalone: true,
  selector: 'cm-product-details',
  templateUrl: './product-details-new.component.html',
  styleUrls: ['./product-details-new.component.scss'],
  imports: [ProductRatingsComponent, ProductQuantityInputComponent, CommonModule, FormsModule]
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: any = null;
  selectedImage: string = '';
  isLoading: boolean = true;

  @Input() rating = 0;
  @Input() maxRating = 5;
  @Output() ratingChange = new EventEmitter<number>();

  showReviewForm = false;
  showWriteReviewBtn = true;
  showCancelReviewBtn = false;

  onWriteReviewClick () {
    this.showReviewForm = true;
    this.showWriteReviewBtn = false;
    this.showCancelReviewBtn = true;
  }

  onCancelReviewClick () {
    this.showReviewForm = false;
    this.showWriteReviewBtn = true;
    this.showCancelReviewBtn = false;
  }

  hoverRating = 0;

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  setHover(value: number) {
    this.hoverRating = value;
  }

  resetHover() {
    this.hoverRating = 0;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get product id from route and load product data
    const id = this.route.snapshot.paramMap.get('id');
    this.loadProductData(id);
  }

  loadProductData(id: string | null): void {
    // Mock product data
    const products = [
      {
        id: '1',
        name: 'Premium Chicken Breast',
        category: 'chicken',
        price: 299,
        discount: 15,
        images: {
          main: 'assets/images/products/chicken-breast-main.jpg',
          gallery: [
            'assets/images/products/chicken-breast-1.jpg',
            'assets/images/products/chicken-breast-2.jpg',
            'assets/images/products/chicken-breast-3.jpg',
            'assets/images/products/chicken-breast-4.jpg'
          ]
        }
      },
      {
        id: '2',
        name: 'Chicken Thigh',
        category: 'chicken',
        price: 249,
        discount: 10,
        images: {
          main: 'assets/images/products/chicken-thigh.jpg',
          gallery: []
        }
      },
      {
        id: '3',
        name: 'Country Eggs',
        category: 'eggs',
        price: 120,
        discount: 14,
        images: {
          main: 'assets/images/products/eggs.jpg',
          gallery: []
        }
      }
    ];
    this.product = products.find(p => p.id === id) || products[0];
    this.selectedImage = this.product.images.main;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
  }

}
