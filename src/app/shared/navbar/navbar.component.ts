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
  // Property to track the categories dropdown state
  isCategoriesDropdownOpen = false;

  // Reference to the dropdown container element
  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;

  // Toggles the dropdown when the "Categories" link is clicked
  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation(); // Prevents the document click listener from closing it immediately
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  // Closes the dropdown
  closeCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen = false;
  }

  // Listens for clicks on the entire page to close the dropdown
  // if the user clicks outside of it.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown.nativeElement.contains(event.target)
    ) {
      this.closeCategoriesDropdown();
    }
  }

  // NOTE: All mobile menu logic (isMobileMenuOpen, toggleMobileMenu) has been removed
  // as it is no longer needed with the new bottom navigation bar.
}