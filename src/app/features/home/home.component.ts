import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerReviewsComponent } from "./customer-reviews/customer-reviews.component";
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
    CustomerReviewsComponent,
    WhyUsComponent
  ]
})

export class HomeComponent {

}
