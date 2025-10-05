import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'country-meat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'country-meat-frontoffice';
  isSplashPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check for splash page
        this.isSplashPage = event.url === '/splash';

        // 👇 Scroll to top when navigating to any new page
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // for smooth scrolling
        });
      });

    // Check initial route on load
    this.isSplashPage = this.router.url === '/splash';
  }
}
