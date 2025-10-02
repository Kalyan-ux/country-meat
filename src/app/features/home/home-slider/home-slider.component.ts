import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  standalone: true,
  selector: 'cm-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, CarouselModule],
})
export class HomeSliderComponent implements OnInit, OnDestroy {
  constructor() {}

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: false,
    dots: true, // show dots
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    freeDrag: false,
    smartSpeed: 1500,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    lazyLoad: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };

  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
