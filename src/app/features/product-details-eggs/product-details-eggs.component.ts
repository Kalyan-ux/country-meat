// product-details-eggs.component.ts

import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ⬅️ ADDED: Import FormsModule

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ⬅️ MODIFIED: Added FormsModule
  templateUrl: './product-details-eggs.component.html',
  styleUrl: './product-details-eggs.component.scss',
})
export class ProductDetailsComponentEggs implements OnInit, AfterViewInit {
  @ViewChild('relatedProductsContainer') relatedProductsContainer!: ElementRef;

  productId!: number;
  product: any;
  relatedProducts: any[] = [];
  activeTab: string = 'keyFeatures';
  productQuantity: number = 0;
  showAddToCart: boolean = false;
  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;
  isDescriptionExpanded: boolean = false;

  allImages: string[] = [];
  selectedImage!: string;
  selectedPackPrice!: number; // ADDED: Property to track selected pack price

  sharedHealthBenefits = [
    'Contains vital nutrients – Vitamins A, B5, B12 and E, including phosphorus and iodine, helps to improve good cholesterol levels and aids weight management',
  ];

  products = [
    {
      id: 1,
      name: 'Free Range Original Country Chicken Eggs',
      subtitle: 'Rare variety of high-protein eggs that come cleaned',
      description:
        'These Country Eggs are laid by rare original native Country Hens (Country Queen) — naturally hatched and lovingly raised in open free-range farms. Pure, wholesome, and rich in authentic nutrition, just the way nature intended. Unlike other breeds, these heritage hens lay only a limited number of eggs each year, making every egg truly special, nutrient-rich, and authentic.',
      features: [
        'Protein rich',
        'Free-Range',
        'High Omega-3',
        'Low-fat',
        'Packed with Vitamins & minerals',
      ],
      price: 180,
      originalPrice: 180, 
      packOptions: [
        { label: 'Pack of 6', price: 180, packSize: 6, originalPrice: 180 },
        { label: 'Pack of 12', price: 360, packSize: 12, originalPrice: 360 },
      ], 
      image: 'assets/images/products/eggs/egg-1.png', 
    },
    {
      id: 2,
      name: 'Free Range Country Chicken Eggs', 
      subtitle: 'Rare variety of high-protein eggs that come cleaned',
      description:'These Country Eggs are laid by breeds like sonali raised in open free-range farms. Pure, wholesome, and rich in nutrition, just the way nature intended.',
      features: [
        'Protein Rich', 
        'Nutritious', 
        'Chemical-free', 
        'Omega-3', 
        'Free-Range'
      ],
      price: 119, 
      originalPrice: 119, 
      packOptions: [
        { label: 'Pack of 6', price: 119, packSize: 6, originalPrice: 119 },
        { label: 'Pack of 12', price: 239, packSize: 12, originalPrice: 239 },
        { label: 'Pack of 30', price: 594, packSize: 30, originalPrice: 594 },
      ],
      image: 'assets/images/products/eggs/egg-2.png', 
    },
    {
      id: 3,
      name: 'Cage Free Country Chicken Eggs',
      subtitle: 'These Country Eggs are laid by breeds like sonali & Aseel raised out of battery cages. Known for their balanced nutrition and authentic taste.',
      description:'These Country Eggs are laid by breeds like sonali & Aseel raised out of battery cages. Known for their balanced nutrition and authentic taste, they’re a wholesome choice for the whole family.',
      features: [
        'Protein Rich', 
        'Nutritious', 
        'Chemical-free', 
        'Better fat profile'
      ],
      price: 99, 
      originalPrice: 99, 
      packOptions: [
        { label: 'Pack of 6', price: 99, packSize: 6, originalPrice: 99 },
        { label: 'Pack of 12', price: 195, packSize: 12, originalPrice: 195 },
        { label: 'Pack of 30', price: 489, packSize: 30, originalPrice: 489 },
      ],
      image: 'assets/images/products/eggs/egg-3.png', 
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productQuantity = 0;
      window.scrollTo(0, 0);

      this.productId = +params['id'];
      const foundProduct = this.products.find((p) => p.id === this.productId);

      if (foundProduct) {
        // Initialize with first pack option details
        const initialPack = foundProduct.packOptions[0];
        
        this.product = {
          ...foundProduct,
          price: initialPack.price, // Set initial price
          originalPrice: initialPack.originalPrice, // Set initial originalPrice
          packSize: initialPack.packSize.toString(), // Set initial packSize for info badge
          healthBenefits: this.sharedHealthBenefits,
        };
        
        this.selectedPackPrice = initialPack.price; // Set initial selected price
        
        this.relatedProducts = this.products.filter(
          (p) => p.id !== this.productId
        );
      } else {
        this.product = null;
      }
      
      // Ensure arrow visibility is updated after relatedProducts are loaded
      if (this.relatedProducts.length > 0) {
          // A slight delay is needed to ensure the DOM elements are rendered
          setTimeout(() => {
            if (this.relatedProductsContainer) {
                this.updateArrowVisibility();
            }
          }, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.relatedProductsContainer) {
      this.updateArrowVisibility();
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  onContainerScroll(): void {
    this.updateArrowVisibility();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (this.relatedProductsContainer) {
      this.updateArrowVisibility();
    }
  }

  updateArrowVisibility(): void {
    const container = this.relatedProductsContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    // Check if scroll is necessary
    if (container.scrollWidth <= container.clientWidth) {
      this.showLeftArrow = false;
      this.showRightArrow = false;
      return;
    }

    this.showLeftArrow = scrollLeft > 5;
    this.showRightArrow = scrollLeft < maxScrollLeft - 5;
  }

  scrollRight(): void {
    const container = this.relatedProductsContainer.nativeElement;
    container.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  scrollLeft(): void {
    const container = this.relatedProductsContainer.nativeElement;
    container.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }

  getDiscount(originalPrice: number, currentPrice: number): number {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  addToCart(): void {
    this.productQuantity = 1;
  }

  increaseQuantity(): void {
    this.productQuantity++;
  }

  decreaseQuantity(): void {
    if (this.productQuantity > 0) {
      this.productQuantity--;
    }
  }
  
  // ADDED: Handler for pack change event
  onPackChange(event: Event): void {
    const selectedPrice = Number((event.target as HTMLSelectElement).value);
    this.selectedPackPrice = selectedPrice;
    
    // Find the selected pack option to update product details
    const selectedPack = this.product.packOptions.find(
      (pack: any) => pack.price === selectedPrice
    );

    if (selectedPack) {
      // Update the product's price, originalPrice, and packSize for display
      this.product.price = selectedPack.price;
      this.product.originalPrice = selectedPack.originalPrice;
      this.product.packSize = selectedPack.packSize.toString();
    }
  }
}
