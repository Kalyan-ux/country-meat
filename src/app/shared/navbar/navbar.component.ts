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
<<<<<<< HEAD
=======
  // Property for the desktop categories dropdown
>>>>>>> updates
  isCategoriesDropdownOpen = false;
  isMobileMenuOpen = false; // Property for mobile menu state

<<<<<<< HEAD
  // Element references for closing menus on outside clicks
=======
  // Property for the mobile search bar visibility
  isMobileSearchActive = false;

>>>>>>> updates
  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;

<<<<<<< HEAD
  // Toggles the "Categories" dropdown
=======
  // Toggles the desktop categories dropdown
>>>>>>> updates
  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

<<<<<<< HEAD
  // Closes the "Categories" dropdown
=======
  // Closes the desktop categories dropdown
>>>>>>> updates
  closeCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen = false;
  }

<<<<<<< HEAD
  // Toggles the entire mobile navigation menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Closes the mobile menu (used when a link is clicked)
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  // Listens for clicks on the document to close open menus
=======
  // Toggles the mobile search bar visibility
  toggleMobileSearch(): void {
    this.isMobileSearchActive = !this.isMobileSearchActive;
  }

  // Listens for clicks on the page to close the categories dropdown
>>>>>>> updates
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close categories dropdown if click is outside
    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown.nativeElement.contains(event.target)
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
<<<<<<< HEAD
}
=======
}
>>>>>>> updates
