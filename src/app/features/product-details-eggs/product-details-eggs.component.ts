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

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
      packSize: '6',
      price: 180,
      image: 'assets/images/products/eggs/egg-1.png', // Ensure this path is correct
    },
    {
      id: 2,
      name: 'Free Range Original Country Chicken Eggs',
      subtitle: 'Rare variety of high-protein eggs that come cleaned',
      description:'These Country Eggs are laid by breeds like sonali raised in open free-range farms. Pure, wholesome, and rich in nutrition, just the way nature intended.',
      features: [
        'Protein rich',
        'Free-Range',
        'High Omega-3',
        'Low-fat',
        'Packed with Vitamins & minerals',
      ],
      packSize: '6',
      price: 180,
      image: 'assets/images/products/eggs/egg-2.png', // Ensure this path is correct
    },
    {
      id: 3,
      name: 'Free Range Original Country Chicken Eggs',
      subtitle: 'Rare variety of high-protein eggs that come cleaned',
      description:'These Country Eggs are laid by breeds like sonali & Aseel raised out of battery cages. Known for their balanced nutrition and authentic taste, they’re a wholesome choice for the whole family.',
      features: [
        'Protein rich',
        'Free-Range',
        'High Omega-3',
        'Low-fat',
        'Packed with Vitamins & minerals',
      ],
      packSize: '6',
      price: 180,
      image: 'assets/images/products/eggs/egg-1.png', // Ensure this path is correct
    },
  ];

  constructor(private route: ActivatedRoute) {}

  // ADDED ngOnInit to fetch product data on component load
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productQuantity = 0;
      window.scrollTo(0, 0);

      this.productId = +params['id'];
      const foundProduct = this.products.find((p) => p.id === this.productId);

      if (foundProduct) {
        this.product = {
          ...foundProduct,
          healthBenefits: this.sharedHealthBenefits,
        };

        this.allImages = [this.product.images, ...this.product.imageGallery];
        this.selectedImage = this.allImages[0];

        // Populate related products, excluding the current one
        this.relatedProducts = this.products.filter(
          (p) => p.id !== this.productId
        );
      } else {
        this.product = null; // Handle case where product isn't found
      }
    });
  }

  ngAfterViewInit(): void {
    // Check if the container exists before updating arrows
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
    if (!originalPrice || !currentPrice) return 0;
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
}
