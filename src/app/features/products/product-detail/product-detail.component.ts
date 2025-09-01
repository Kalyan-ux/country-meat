import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product: any;

  // Mock product list – replace with service/API later
  products = [
    {
      id: 1,
      name: 'Kadaknath Country Chicken',
      price: 1050,
      originalPrice: 1150,
      image: 'assets/images/Kadaknath.png',
      rating: 4.8,
      reviews: 245,
      description: 'Kadaknath (Kaali Masi) country chicken, aged 5-6 months. Known for its black meat, high protein content, and rich health benefits.',
      features: ['Antibiotic-Free', 'Free-Range', 'Nutritious', 'Flavorful']
    },
    {
      id: 2,
      name: 'Country King',
      price: 1199,
      originalPrice: 2000,
      image: 'assets/images/products/country_king.png',
      rating: 4.9,
      reviews: 189,
      description: 'Country King (Desi Rooster, Nati Koli, Hunja, Punju, Seval) aged 7-10 months. Naturally hatched, free-range, antibiotic-free, and fed on grains, millets, greens, and insects for superior taste, texture, and health benefits.',
      features: ['Natural', 'Free-Range', 'Organic', 'Healthy']
    }
    // add other chicken products here
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === this.productId);
  }
}
