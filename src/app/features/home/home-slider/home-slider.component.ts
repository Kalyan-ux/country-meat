import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
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
  
  // FIX: Declare and initialize the stable image path array property
  imageFullSrcs: string[] = [
    'assets/images/banner/banner-1.jpg',
    'assets/images/banner/banner-2.jpg',
    'assets/images/banner/banner-3.jpg',
  ];

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

  ngOnInit(): void {
    // Initial check to load the correct image on startup
    this.checkScreenSize();
  }
  
  // Listen for window resize events to swap images dynamically
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Logic to determine and set the full image paths
  checkScreenSize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) { 
      this.imageFullSrcs = [
        'assets/images/banner/banner-1-mb.png',
        'assets/images/banner/banner-2-mb.png',
        'assets/images/banner/banner-3-mb.png',
      ];
    } else {
      this.imageFullSrcs = [
        'assets/images/banner/banner-1.jpg',
        'assets/images/banner/banner-2.jpg',
        'assets/images/banner/banner-3.jpg',
      ];
    }
  }

  ngOnDestroy(): void {}
}
