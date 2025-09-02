import { Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { LoginComponent } from './features/account/login/login.component';
import { RegisterComponent } from './features/account/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { OrderConfirmationComponent } from './features/orders/order-confirmation/order-confirmation.component';
import { OrderTrackingComponent } from './features/orders/order-tracking/order-tracking.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartViewComponent } from './features/product-order/cart-view/cart-view.component';
import { CheckoutComponent } from './features/product-order/checkout/checkout.component';
import { ChickenComponent } from './features/products/chicken/chicken.component';
import { EggsComponent } from './features/products/eggs/eggs.component';
import { ProductListingComponent } from './features/products/product-listing/product-listing.component';
import { SplashComponent } from './features/splash/splash.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListingComponent },
  { path: 'products/chicken', component: ChickenComponent },
  { path: 'products/product-details', component: ProductDetailsComponent },
  { path: 'products/eggs', component: EggsComponent },
  { path: 'products/:category', component: ProductListingComponent },
  { path: 'cart', component: CartViewComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: '**', redirectTo: '' }
];
