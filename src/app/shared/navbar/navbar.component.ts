import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cm-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // Dropdown and UI states
  isCategoriesDropdownOpen = false;
  isMobileMenuOpen = false;
  isMobileSearchActive = false;

  // Element references for dropdown and collapsible areas
  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;

  // Toggles the desktop categories dropdown
  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  // Closes the desktop categories dropdown
  closeCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen = false;
  }

  // Toggles the entire mobile navigation menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Closes the mobile menu (used when a link is clicked)
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  // Toggles the mobile search bar visibility
  toggleMobileSearch(): void {
    this.isMobileSearchActive = !this.isMobileSearchActive;
  }

  // Closes menus when clicking outside their respective areas
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    // Close categories dropdown if click is outside
    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown &&
      !this.categoriesDropdown.nativeElement.contains(targetElement)
    ) {
      this.closeCategoriesDropdown();
    }

    // Close mobile menu if click is outside the collapsible area and toggler
    if (
      this.isMobileMenuOpen &&
      this.navbarCollapse &&
      this.navbarToggler &&
      !this.navbarCollapse.nativeElement.contains(targetElement) &&
      !this.navbarToggler.nativeElement.contains(targetElement)
    ) {
      this.closeMobileMenu();
    }
  }
}
