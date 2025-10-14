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
  isCategoriesDropdownOpen = false;
  isMobileMenuOpen = false; // Property for mobile menu state

  // Element references for closing menus on outside clicks
  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;

  // Toggles the "Categories" dropdown
  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  // Closes the "Categories" dropdown
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

  // Listens for clicks on the document to close open menus
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close categories dropdown if click is outside
    if (
      this.isCategoriesDropdownOpen &&
      !this.categoriesDropdown.nativeElement.contains(event.target)
    ) {
      this.closeCategoriesDropdown();
    }

    // Close mobile menu if click is outside the menu and its toggler button
    if (
      this.isMobileMenuOpen &&
      this.navbarCollapse &&
      !this.navbarCollapse.nativeElement.contains(event.target) &&
      !this.navbarToggler.nativeElement.contains(event.target)
    ) {
      this.closeMobileMenu();
    }
  }
}
