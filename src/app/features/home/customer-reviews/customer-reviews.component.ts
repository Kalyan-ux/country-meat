import { Component, OnDestroy, OnInit } from "@angular/core";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  standalone: true,
  selector: 'cm-home-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.scss'],
  imports: [CarouselModule]
})

export class CustomerReviewsComponent implements OnInit, OnDestroy {

  reviewOptions: OwlOptions = {
      rewind: true,
      nav: true,
      dots: false,
      margin: 30,
      autoHeight: true,
      navText: ['',''],
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive:{
        0:{
          items:1,
          margin: 15
        },
        479:{
          items:1,
          margin: 15
        },
        768:{
          items:2
        },
        979:{
          items:2
        },
        1199:{
          items:2
        }
      }
    };

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
  
}
