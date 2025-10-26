import { Component, ViewChild, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cm-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCategoriesDropdownOpen = false;
  isMobileMenuOpen = false;
  isMobileSearchActive = false;

  isLoggedIn = false;
  userName: string = 'User'; // Default

  showUserDropdown = false;
  showBottomUserDropdown = false;

  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  @ViewChild('userDropdown') userDropdown!: ElementRef;
  @ViewChild('bottomUserDropdown') bottomUserDropdown!: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ Load from localStorage on refresh or page load
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.name) {
      this.userName = currentUser.name;
      this.isLoggedIn = true;
    }

    // ✅ Sync with AuthService (when user logs in/out)
    this.authService.isLoggedIn$.subscribe((state) => {
      this.isLoggedIn = state;

      // Also refresh user info dynamically
      const updatedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.userName = updatedUser?.name || 'User';
    });

    this.authService.userName$.subscribe((name) => {
      this.userName = name || 'User';
    });
  }

  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  toggleUserDropdown(event: Event): void {
    event.stopPropagation();
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleBottomUserDropdown(event: Event): void {
    event.stopPropagation();
    this.showBottomUserDropdown = !this.showBottomUserDropdown;
  }

  closeCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleMobileSearch(): void {
    this.isMobileSearchActive = !this.isMobileSearchActive;
  }

  logout(): void {
    this.authService.logoutUser();
    localStorage.removeItem('currentUser');
    this.userName = 'User';
    this.isLoggedIn = false;
    this.showUserDropdown = false;
    this.showBottomUserDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown &&
      !this.categoriesDropdown.nativeElement.contains(targetElement)
    ) {
      this.closeCategoriesDropdown();
    }

    if (
      this.isMobileMenuOpen &&
      this.navbarCollapse &&
      this.navbarToggler &&
      !this.navbarCollapse.nativeElement.contains(targetElement) &&
      !this.navbarToggler.nativeElement.contains(targetElement)
    ) {
      this.closeMobileMenu();
    }

    if (
      this.showUserDropdown &&
      this.userDropdown &&
      !this.userDropdown.nativeElement.contains(targetElement)
    ) {
      this.showUserDropdown = false;
    }

    if (
      this.showBottomUserDropdown &&
      this.bottomUserDropdown &&
      !this.bottomUserDropdown.nativeElement.contains(targetElement)
    ) {
      this.showBottomUserDropdown = false;
    }
  }
}
