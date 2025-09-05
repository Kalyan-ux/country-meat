import { Component, OnDestroy, OnInit } from "@angular/core";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { ProductQuantityInputComponent } from "../../../shared/components/product-quantity-input/product-quantity-input.component";
import { ProductRatingsComponent } from "../../../shared/components/product-ratings/product-ratings.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'cm-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss'],
  imports: [CarouselModule, ProductRatingsComponent, CommonModule, RouterModule]
})

export class TrendingProductsComponent implements OnInit, OnDestroy {

  trendingOptions: OwlOptions = {
    rewind: true,
    margin: 30,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    dots: false,loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1
    // responsive:{
    //   0:{
    //     items: 2,
    //     margin: 15,
    //   },
    //   600:{
    //     items: 3
    //   },
    //   1000:{
    //     items: 4
    //   }
    // }
  };

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
