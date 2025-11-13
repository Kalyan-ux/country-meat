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

  imageFullSrcs: string[] = [
    'assets/images/banner/banner-1.webp',
    'assets/images/banner/banner-2.webp',
    'assets/images/banner/banner-3.webp',
  ];

  private autoplayTimeoutRef: any;

  constructor() {}

  // 💡 FIX 1: Removed complex fade-in/out animations for smoother manual swiping.
  // 💡 FIX 2: Reduced smartSpeed further to 300ms for snappier response.
  customOptions: OwlOptions = ({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: false,
    dots: true,
    nav: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: false,
    smartSpeed: 300, // Reduced from 500ms for maximum responsiveness
    // Removed: animateOut: 'fadeOut',
    // Removed: animateIn: 'fadeIn',
    lazyLoad: true,
    onDrag: this.onDragStart.bind(this),
    onDragged: this.onDragEnd.bind(this),
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  } as OwlOptions) as any;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  onDragStart() {
    // Clear pending timeout and stop autoplay immediately
    if (this.autoplayTimeoutRef) {
      clearTimeout(this.autoplayTimeoutRef);
    }
    // Set the options object to stop autoplay
    this.customOptions = { ...this.customOptions, autoplay: false } as any;
  }

  onDragEnd() {
    // Wait a short duration (e.g., 5 seconds) before resuming autoplay
    const delayBeforeResume = 5000;

    // Clear any previous timeout
    if (this.autoplayTimeoutRef) {
      clearTimeout(this.autoplayTimeoutRef);
    }

    this.autoplayTimeoutRef = setTimeout(() => {
      // Re-enable autoplay after the delay
      this.customOptions = { ...this.customOptions, autoplay: true } as any;
    }, delayBeforeResume);
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      this.imageFullSrcs = [
        'assets/images/banner/banner-1-mb.webp',
        'assets/images/banner/banner-2-mb.webp',
        'assets/images/banner/banner-3-mb.webp',
      ];
    } else {
      this.imageFullSrcs = [
        'assets/images/banner/banner-1.webp',
        'assets/images/banner/banner-2.webp',
        'assets/images/banner/banner-3.webp',
      ];
    }
  }

  ngOnDestroy(): void {
    // Clean up the timeout
    if (this.autoplayTimeoutRef) {
      clearTimeout(this.autoplayTimeoutRef);
    }
  }
}
