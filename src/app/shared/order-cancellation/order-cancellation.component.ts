import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-cancellation',
  standalone: true,
  templateUrl: './order-cancellation.component.html',
  styleUrls: ['./order-cancellation.component.scss'],
  imports: [] // RouterModule not needed if using navigate
})
export class OrderCancellationComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
