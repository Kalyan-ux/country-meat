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
  showLogoutConfirm = false; // ✅ Added for modal toggle

  isLoggedIn = false;
  userName: string = 'User';
  userPhone: string = '';

  @ViewChild('categoriesDropdown') categoriesDropdown!: ElementRef;
  @ViewChild('userSidebar') userSidebar!: ElementRef;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser?.name) {
      this.userName = currentUser.name;
      this.userPhone = currentUser.phone || '';
      this.isLoggedIn = true;
    }

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

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isSidebarOpen = false;
  }

  // ✅ Opens confirmation popup instead of direct logout
  logout(): void {
    this.showLogoutConfirm = true;
  }

  // ✅ When user clicks "Yes"
  confirmLogout(): void {
    this.authService.logoutUser();
    localStorage.removeItem('currentUser');
    this.isSidebarOpen = false;
    this.isLoggedIn = false;
    this.userName = 'User';
    this.showLogoutConfirm = false;
    this.router.navigate(['/']);
  }

  // ✅ When user clicks "Cancel"
  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (
      this.isCategoriesDropdownOpen &&
      this.categoriesDropdown &&
      !this.categoriesDropdown.nativeElement.contains(targetElement)
    ) {
      this.isCategoriesDropdownOpen = false;
    }

    if (
      this.isSidebarOpen &&
      this.userSidebar &&
      !this.userSidebar.nativeElement.contains(targetElement) &&
      !targetElement.closest('.user-btn')
    ) {
      this.isSidebarOpen = false;
    }
  }
  shareReferralLink() {
  const referralLink = 'https://countrymeat.com/signup?ref=YOURCODE';
  if (navigator.share) {
    navigator.share({
      title: 'Join Country Meat!',
      text: 'Get premium fresh meat & poultry delivered to your doorstep. Use my referral link!',
      url: referralLink,
    });
  } else {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  }
}

}
