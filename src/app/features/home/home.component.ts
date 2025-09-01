import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerReviewsComponent } from "./customer-reviews/customer-reviews.component";
import { HomeNewsletterComponent } from "./home-newsletter/home-newsletter.component";
import { HomeSliderComponent } from "./home-slider/home-slider.component";
import { ShopByCategoryComponent } from "./shop-by-category/shop-by-category.component";
import { TrendingProductsComponent } from "./trending-products/trending-products.component";
import { WhyUsComponent } from "./why-us/why-us.component";

@Component({
  standalone: true,
  selector: 'cm-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    HomeSliderComponent,
    ShopByCategoryComponent,
    TrendingProductsComponent,
    WhyUsComponent,
    CustomerReviewsComponent,
    HomeNewsletterComponent
  ]
})

export class HomeComponent {

  constructor() {
    console.log('HomeComponent loaded');
  }

}