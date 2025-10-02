import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'cm-shop-category',
  templateUrl: './shop-by-category.component.html',
  styleUrls: ['./shop-by-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule],
})
export class ShopByCategoryComponent implements OnInit, OnDestroy {
  isDesktopView: boolean = true;

  categories = [
    {
      id: 'chicken',
      title: 'Premium Chicken',
      shortTitle: 'Chicken',
      description: 'Fresh & Premium',
      image: '../../../../assets/images/chicken.jpg',
      itemCount: '15+ Varieties',
      route: '/products/chicken',
    },
    {
      id: 'eggs',
      title: 'Fresh Eggs',
      shortTitle: 'Eggs',
      description: 'Farm Fresh Daily',
      image: '../../../../assets/images/eggs1.png',
      itemCount: '8+ Varieties',
      route: '/products/eggs',
    },
    {
      id: 'mutton',
      title: 'Premium Mutton',
      shortTitle: 'Mutton',
      description: 'Premium Cuts',
      image: '../../../../assets/images/mutton.jpg',
      itemCount: '12+ Cuts',
      route: '/products/mutton',
    },
    {
      id: 'seafood',
      title: 'Fresh Seafood',
      shortTitle: 'Seafood',
      description: 'Ocean Fresh',
      image: '../../../../assets/images/seafood.jpg',
      itemCount: '10+ Varieties',
      route: '/products/seafood',
    },
  ];

  ngOnInit(): void {
    this.updateViewModel();
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.updateViewModel();
  }

  private updateViewModel(): void {
    this.isDesktopView = window.innerWidth >= 1024;
  }

  ngOnDestroy(): void {}
}
