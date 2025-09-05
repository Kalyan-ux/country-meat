import { CommonModule } from '@angular/common';
import {Component, ViewChild, ElementRef, AfterViewInit, HostListener} from '@angular/core';

@Component({
  selector: 'cm-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss'],
})
export class WhyUsComponent implements AfterViewInit {
  @ViewChild('featuresContainer') featuresContainer!: ElementRef;

  // State for arrow visibility
  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;

  whyUsFeatures = [
    {
      id: 1,
      image: 'assets/images/Artboard 1.png',
      title: 'Premium Quality',
    },
    {
      id: 2,
      image: 'assets/images/Artboard 2.png',
      title: 'Expert Processing',
    },
    {
      id: 3,
      image: 'assets/images/Artboard 3.png',
      title: 'Cold Chain',
    },
    {
      id: 4,
      image: 'assets/images/Artboard 4-1.png',
      title: 'Fresh Daily',
    },
    {
      id: 5,
      image: 'assets/images/Artboard 4-2.png',
      title: 'Quality Assured',
    },
    {
      id: 6,
      image: 'assets/images/Artboard 4-3.png',
      title: 'Fast Delivery',
    },
    {
      id: 7,
      image: 'assets/images/Artboard 4.png',
      title: 'Customer Satisfaction',
    },
  ];

  ngAfterViewInit(): void {
    // Use a timeout to ensure the view is fully rendered before checking dimensions
    setTimeout(() => this.updateArrowVisibility(), 0);
  }
  // Update arrow visibility on scroll
  onContainerScroll(): void {
    this.updateArrowVisibility();
  }

  // Update arrow visibility on window resize
  @HostListener('window:resize')
  onResize(): void {
    this.updateArrowVisibility();
  }

  // Logic to show/hide arrows
  updateArrowVisibility(): void {
    const container = this.featuresContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    this.showLeftArrow = scrollLeft > 0;
    // Check if scroll is at the end (with a small tolerance)
    this.showRightArrow = scrollLeft < maxScrollLeft - 1;
  }

  // Scroll right by one item's width + gap
  scrollRight(): void {
    const container = this.featuresContainer.nativeElement;
    container.scrollBy({
      left: 340, // Adjust this value based on item width + gap
      behavior: 'smooth',
    });
  }

  // Scroll left by one item's width + gap
  scrollLeft(): void {
    const container = this.featuresContainer.nativeElement;
    container.scrollBy({
      left: -340, // Adjust this value based on item width + gap
      behavior: 'smooth',
    });
  }
}
