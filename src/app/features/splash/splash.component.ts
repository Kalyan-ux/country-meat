import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  standalone: true,
  selector: 'cm-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  imports: [CommonModule, RouterModule, FooterComponent]
})
export class SplashComponent {
  
  // Key values data
  keyValues = [
    {
      icon: 'fa fa-leaf',
      title: 'Freshness',
      description: 'Farm-fresh meat delivered within hours of processing'
    },
    {
      icon: 'fa fa-shield-alt',
      title: 'Quality',
      description: 'Premium grade meat from healthy, naturally raised animals'
    },
    {
      icon: 'fa fa-heart',
      title: 'Hygiene',
      description: 'Strict hygiene standards and temperature-controlled processing'
    },
    {
      icon: 'fa fa-truck',
      title: 'Farm-to-Table',
      description: 'Direct from farm to your table, ensuring complete traceability'
    }
  ];

  constructor() {
    console.log('SplashComponent loaded');
  }
}
