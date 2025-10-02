import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  features: Feature[] = [
    {
      icon: 'fa-leaf',
      title: 'Farm Fresh Quality',
      description:
        'Our products come directly from trusted farms, ensuring the highest quality and freshness for your family.',
    },
    {
      icon: 'fa-truck',
      title: 'Fast Delivery',
      description:
        'We deliver fresh meat and poultry to your doorstep within hours, maintaining the cold chain throughout.',
    },
    {
      icon: 'fa-shield',
      title: 'Quality Assured',
      description:
        'Every product undergoes strict quality checks and is certified safe for consumption by our expert team.',
    },
    {
      icon: 'fa-heart',
      title: 'Customer First',
      description:
        'Your satisfaction is our priority. We provide excellent customer service and support at every step.',
    },
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      image: 'assets/images/user-profile-icon.jpg',
      description:
        'With 15+ years in the food industry, Rajesh founded Country Meat to bring farm-fresh quality to every home.',
    },
    {
      name: 'Priya Sharma',
      position: 'Quality Head',
      image: 'assets/images/user-profile-icon.jpg',
      description:
        'Priya ensures every product meets our high standards through rigorous quality control processes.',
    },
    {
      name: 'Amit Patel',
      position: 'Operations Manager',
      image: 'assets/images/user-profile-icon.jpg',
      description:
        'Amit oversees our supply chain and delivery operations to ensure timely and fresh deliveries.',
    },
  ];

  stats = {
    customers: '50,000+',
    deliveries: '2,00,000+',
    cities: '25+',
    experience: '10+',
  };

  statsData = [
    {
      icon: 'fa-users',
      value: '50,000+',
      label: 'Happy Customers',
    },
    {
      icon: 'fa-truck',
      value: '2,00,000+',
      label: 'Successful Deliveries',
    },
    {
      icon: 'fa-map-marker-alt',
      value: '25+',
      label: 'Cities Served',
    },
    {
      icon: 'fa-calendar',
      value: '10+',
      label: 'Years Experience',
    },
  ];

  ngOnInit(): void {}

  scrollToSection(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
