import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('relatedProductsContainer') relatedProductsContainer!: ElementRef;

  productId!: number;
  product: any;
  relatedProducts: any[] = [];
  activeTab: string = 'keyFeatures';

  // New properties to manage cart state
  productQuantity: number = 0;
  showAddToCart: boolean = false;

  // New properties for arrow visibility
  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;
  isDescriptionExpanded: boolean = false;
  truncatedDescription: string = '';

  sharedDescription =
    'Experience the rich, authentic flavor of our Country King — a premium class of chicken that is 100% natural and matured in village farms. Known for its firm texture and bold taste, this bird is indeed a traditional delicacy. Our bird is grown for 7-10 months and raised without antibiotics, this bird is fed a nutritious native diet. A favorite among meat lovers who value quality, tradition, and unmatched taste.';

  sharedKeyFeatures = [
    '100% Natural & Antibiotic-Free – No antibiotics, steroids, or artificial growth enhancers',
    'Free-Range – Raised in the backyards of farmers, where they roam freely and grow in a stress-free, organic environment.',
    'Naturally Hatched – No incubators used; hatched naturally by mother hens.',
    'Nutritious Diet – Fed on grains, millets, greens, and insects for superior flavor and health benefits.',
    'Pure Nati Roosters & Hens – Authentic, naturally raised native breed.',
    'Better Taste & Texture – Firm, excellent flavorful meat due to an active lifestyle.',
    'Perfect for: Health-conscious families, fitness enthusiasts, organic food lovers & traditional food enthusiasts.',
  ];

  sharedHealthBenefits = [
    'Nutritional superiority, Higher Protein-to-Fat Ratio.',
    'Calcium & Phosphorus Rich – Supports strong bones and teeth',
    'Rich in Protein & Omega-3s – Higher in lean protein, essential vitamins, and healthy fats for better well-being.',
    'Lower Fat Content – Leaner than commercially raised chicken, making it a healthier option',
    'More Collagen – improves joint and skin health.',
    'Rich in Micro nutrients - Higher levels of iron, zinc, and B vitamins, which boost immunity.',
    'Better option for long-term health',
  ];

  products = [
    {
      id: 1,
      name: "Country King - Country Meat's special",
      liveWeight: '1400-1650 gm',
      meatWeight: '1000-1200 gm',
      age: '7 - 10 Months',
      price: 1199,
      image: 'assets/images/products/country_king.png',
      originalPrice: 1399,
      tags: ['Bone-in', 'Curry Cut', 'Premium'],
      netWeight: '1 Kilogram',
      pieces: '15 Pieces',
      serves: '8-10',
    },
    {
      id: 2,
      name: "Country Queen - Country Meat's special",
      liveWeight: '1200-1400 gm',
      meatWeight: '900-1100 gm',
      age: '5 - 7 Months',
      price: 999,
      image: 'assets/images/products/country_queen.png',
      originalPrice: 1149,
      tags: ['Bone-in', 'Curry Cut', 'Tender'],
      netWeight: '1 Kilogram',
      pieces: '18 Pieces',
      serves: '6-8',
    },
    {
      id: 3,
      name: "Country Warrior - Country Meat's special",
      liveWeight: '1300-1500 gm',
      meatWeight: '950-1150 gm',
      age: '5 - 6 Months',
      price: 849,
      image: 'assets/images/products/Country_Warrior.png',
      originalPrice: 999,
      tags: ['Bone-in', 'Biryani Cut', 'Robust'],
      netWeight: '1 Kilogram',
      pieces: '12 Pieces',
      serves: '7-9',
    },
    {
      id: 4,
      name: "Kadaknath Chicken - Country Meat's special",
      liveWeight: '1100-1300 gm',
      meatWeight: '800-1000 gm',
      age: '5 - 6 Months',
      price: 1050,
      image: 'assets/images/Kadaknath.png',
      originalPrice: 1250,
      tags: ['Bone-in', 'Specialty', 'Nutrient-Rich'],
      netWeight: '900 Grams',
      pieces: '14 Pieces',
      serves: '5-7',
    },
    {
      id: 5,
      name: "Tender Country Chicken - Country Meat's special",
      liveWeight: '900-1100 gm',
      meatWeight: '650-800 gm',
      age: '3 - 4 Months',
      price: 619,
      image: 'assets/images/products/Tender_Country.png',
      originalPrice: 720,
      tags: ['Bone-in', 'Small Cuts', 'Tender'],
      netWeight: '750 Grams',
      pieces: '20 Pieces',
      serves: '4-5',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = +params['id'];
      const foundProduct = this.products.find((p) => p.id === this.productId);

      if (foundProduct) {
        this.product = {
          ...foundProduct,
          description: this.sharedDescription,
          keyFeatures: this.sharedKeyFeatures,
          healthBenefits: this.sharedHealthBenefits,
        };
        if (this.product.description.length > 150) {
          this.truncatedDescription = this.product.description.substring(0, 150) + '...';
        } else {
          this.truncatedDescription = this.product.description;
        }
      } else {
        this.product = null;
      }
      this.relatedProducts = this.products.filter(
        (p) => p.id !== this.productId
      );
    });
  }

  ngAfterViewInit(): void {
    this.updateArrowVisibility();
  }

  // New method to handle the scroll event from the container
  onContainerScroll(): void {
    this.updateArrowVisibility();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateArrowVisibility();
  }

    updateArrowVisibility(): void {
    const container = this.relatedProductsContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    this.showLeftArrow = scrollLeft > 0;
    this.showRightArrow = scrollLeft < maxScrollLeft - 1;
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

  // Method to change the active tab
  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }

  // Calculate discount percentage
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

  toggleDescription(): void {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }
}
