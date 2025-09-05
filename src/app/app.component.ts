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
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'country-meat-frontoffice';
  isSplashPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes to detect splash page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isSplashPage = event.url === '/splash';
      });

    // Check initial route
    this.isSplashPage = this.router.url === '/splash';
  }
}
