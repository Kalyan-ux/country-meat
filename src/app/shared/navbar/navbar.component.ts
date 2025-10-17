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
  // Property for the desktop categories dropdown
  isCategoriesDropdownOpen = false;

  // Property for the mobile search bar visibility
  isMobileSearchActive = false;

  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;

  // Toggles the desktop categories dropdown
  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  // Closes the desktop categories dropdown
  closeCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen = false;
  }

  // Toggles the mobile search bar visibility
  toggleMobileSearch(): void {
    this.isMobileSearchActive = !this.isMobileSearchActive;
  }

  // Listens for clicks on the page to close the categories dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown.nativeElement.contains(event.target)
    ) {
      this.closeCategoriesDropdown();
    }
  }
}