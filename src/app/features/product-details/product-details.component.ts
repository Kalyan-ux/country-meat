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
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
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
      name: 'Country King',
      specialNote: "Country Meat's Special",
      subtitle: 'Original Nati Hunja/Punju/Seval/Desi rooster',
      shortdescription:'The OG of chickens — Naturally hatched, naturally raised and slow-grown for bold taste and firm texture. Experience a true traditional delicacy, pure and authentic.',
      description:
        'The Country King is no ordinary bird – it is the true original, respected in every village. Naturally hatched and raised free in the open, it thrives on what nature provides without artificial feed. The Country King grows slowly over 7 to 10 months, developing natural strength, bold character, and rich flavor. People call it pure, they call it original – we proudly call it The Country King, the OG of all chickens. Experience the rich, authentic flavor of our Country King — a premium class of chicken that is 100% natural and matured in village farms. Known for its firm texture and bold taste, this bird is indeed a traditional delicacy.',
      age: '7 - 10 Months',
      weight: '1100-1250 g',
      serves: '4-6',
      meatType: 'Firm & Flavourful',
      price: 1175,
      originalPrice: 1305,
      note: 'The weight mentioned above is the Net weight of Meat, Fresh Not Frozen',
      isOutOfStock: false,
      images: 'assets/images/products/ck/country-king-0.png',
      imageGallery: [
        'assets/images/products/ck/country-king-1.png',
        'assets/images/products/ck/country-king-2.png',
      ],
    },
    {
      id: 2,
      name: 'Country Queen',
      specialNote: "Country Meat's Special",
      subtitle: 'Original Nati Yate / Petta / Potte Koli / Desi hen',
      shortdescription:'The Queens of chickens — Naturally hatched, naturally raised and slow-grown for juicy, flavorful taste and firm texture. Experience a true traditional delicacy, pure and authentic.',
      description:
        'The Country Queen is more than just a hen. Naturally hatched and raised under open skies, she thrives on wholesome grains and greens from the earth. Growing slowly over 6 to 8 months, she develops natural strength and a rich, deep flavour that has been cherished for generations. Her eggs are prized, and for generations, her meat has been given to new mothers for nourishment, healing, and strength. Revered as the pure, original hen — we proudly call her The Country Queen.',
      age: '6 - 8 Months',
      weight: '1000-1200 gm', // Corrected casing
      serves: '4-6',
      meatType: 'Firm & Juicy',
      price: 986,
      originalPrice: 1095,
      note: 'The weight mentioned above is the Net weight of Meat, Fresh Not Frozen',
      isOutOfStock: true, // Corrected casing
      images: 'assets/images/products/cq/country-queen-0.png',
      imageGallery: [
        'assets/images/products/cq/country-queen-1.png',
        'assets/images/products/cq/country-queen-2.png',
        'assets/images/products/cq/country-queen-3.png',
        'assets/images/products/cq/country-queen-4.png',
      ],
    },
    {
      id: 3,
      name: 'Country Warrior',
      subtitle: 'Original Fighter Koli / Pandyam kodi / Sandekozi',
      shortdescription:'The pride of the village and famed for traditional rooster fights. Naturally raised in the open, he grows strong and muscular with firm, protein-rich meat and bold flavor. A true symbol of India’s native poultry heritage.',
      description:
        'The pride of the village, he is famed for the traditional rooster fights. Naturally raised in open spaces, he grows strong and muscular, with a fierce build unlike any other. His meat is firm, protein-rich, and deeply flavorful — a true delicacy for those who cherish authentic country chicken. Celebrated for his bold presence and deep, robust flavor, he remains a true symbol of India’s native poultry heritage. We call him The Country Warrior.',
      age: '7 - 10 Months',
      weight: '1200-1400 gm', // Corrected casing
      serves: '4-6',
      meatType: 'Firm & Juicy',
      price: 819,
      originalPrice: 969,
      note: 'The weight mentioned above is the Net weight of Meat, Fresh Not Frozen',
      isOutOfStock: false, // Corrected casing
      images: 'assets/images/products/cw/country-warrior-0.png',
      imageGallery: [
        'assets/images/products/cw/country-warrior-1.png',
        'assets/images/products/cw/country-warrior-2.png',
        'assets/images/products/cw/country-warrior-3.png',
      ],
    },
    {
      id: 4,
      name: 'Kadaknath Chicken',
      subtitle: 'Kaala Masi / Kadaknath',
      shortdescription:'A rare native breed, jet black inside out and rich in heritage. With 20–25% more protein, high iron, and near-zero fat, it’s a natural superfood — boosting strength, supporting heart health, and aiding weight management.',
      description:
        'Not all chickens are the same — some are born to stand out. A rare native breed from the tribal heartland of Madhya Pradesh, is jet black inside out — feathers, skin, bones, and even the meat. A natural marvel of pigmentation, it has been protected and preserved as a proud symbol of India’s heritage. Rich in protein and iron, yet low in fat and cholesterol, Kadaknath is prized as a power-packed superfood. Rare, unique, and naturally nourishing — this is Kadaknath, India’s Black Beauty..',
      age: '5 - 6 Months',
      weight: '1100-1250 gm', // Corrected casing
      serves: '4-6',
      meatType: 'Soft & Juicy',
      price: 999,
      originalPrice: 1100,
      note: 'The weight mentioned above is the Net weight of Meat, Fresh Not Frozen',
      isOutOfStock: false, // Corrected casing
      images: 'assets/images/products/kad/kadaknath-0.png',
      imageGallery: ['assets/images/products/kad/kadaknath-1.png'],
    },
    {
      id: 5,
      name: 'Tender Country Chicken',
      subtitle: 'Village Nati Koli, Mysore Queen, Sonali',
      shortdescription:'The pride of the village and famed for traditional rooster fights. Naturally raised in the open, he grows strong and muscular with firm, protein-rich meat and bold flavor. A true symbol of India’s native poultry heritage.',
      description:
        'Not all country chickens are tough. Some grow younger and softer — naturally raised on grains, greens, and time. With juicy, tender meat that cooks easily, they bring a taste families love and children always ask for. Soft, juicy, and full of flavor that’s Tender Country Chicken. Perfect for everyday meals —whether it’s a Sunday curry or a quick pepper fry.',
      age: '5 - 6 Months',
      weight: '1000-1200 gm', // Corrected casing
      serves: '4-6',
      meatType: 'Soft, tender & Juicy ',
      price: 899,
      originalPrice: 899,
      note: 'The weight mentioned above is the Net weight of Meat, Fresh Not Frozen',
      isOutOfStock: false, // Corrected casing
      images: 'assets/images/products/tc/tender-country-0.png',
      imageGallery: [
        'assets/images/products/tc/tender-country-1.png',
        'assets/images/products/tc/tender-country-2.png',
      ],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  // ADDED ngOnInit to fetch product data on component load
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productQuantity = 0;
      this.isDescriptionExpanded = false;
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

  toggleDescription(): void {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
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
