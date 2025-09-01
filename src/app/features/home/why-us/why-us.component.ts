import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'cm-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent {
  whyUsFeatures = [
    {
      id: 1,
      image: 'assets/images/Artboard 1.png',
      title: 'Premium Quality'
    },
    {
      id: 2,
      image: 'assets/images/Artboard 2.png',
      title: 'Expert Processing'
    },
    {
      id: 3,
      image: 'assets/images/Artboard 3.png',
      title: 'Cold Chain'
    },
    {
      id: 4,
      image: 'assets/images/Artboard 4-1.png',
      title: 'Fresh Daily'
    },
    {
      id: 5,
      image: 'assets/images/Artboard 4-2.png',
      title: 'Quality Assured'
    },
    {
      id: 6,
      image: 'assets/images/Artboard 4-3.png',
      title: 'Fast Delivery'
    },
    {
      id: 7,
      image: 'assets/images/Artboard 4.png',
      title: 'Customer Satisfaction'
    }
  ];
}
