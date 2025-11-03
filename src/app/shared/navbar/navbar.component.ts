import {
  Component,
  ViewChild,
  HostListener,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  isMobileSearchActive = false;
  isSidebarOpen = false;

  isLoggedIn = false;
  userName: string = 'User';
  userPhone: string = '';

  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;
  @ViewChild('userSidebar') userSidebar!: ElementRef;

  // ✅ Make router public (to use it in HTML)
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser?.name) {
      this.userName = currentUser.name;
      this.userPhone = currentUser.phone || '';
      this.isLoggedIn = true;
    }

    // Update on login/logout
    this.authService.isLoggedIn$.subscribe((state) => {
      this.isLoggedIn = state;
      const updatedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.userName = updatedUser?.name || 'User';
      this.userPhone = updatedUser?.phone || '';
    });
  }

  toggleCategoriesDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  closeCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen = false;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMobileSearch(): void {
    this.isMobileSearchActive = !this.isMobileSearchActive;
  }

  // ✅ Helper for sidebar navigation
  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isSidebarOpen = false;
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logoutUser();
      localStorage.removeItem('currentUser');
      this.isSidebarOpen = false;
      this.isLoggedIn = false;
      this.userName = 'User';
      this.router.navigate(['/']);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    // Close category dropdown
    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown &&
      !this.categoriesDropdown.nativeElement.contains(targetElement)
    ) {
      this.isCategoriesDropdownOpen = false;
    }

    // Close sidebar
    if (
      this.isSidebarOpen &&
      this.userSidebar &&
      !this.userSidebar.nativeElement.contains(targetElement) &&
      !targetElement.closest('.user-btn')
    ) {
      this.isSidebarOpen = false;
    }
  }
}
