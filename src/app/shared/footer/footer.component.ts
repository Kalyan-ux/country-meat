import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'cm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterModule],
})
export class FooterComponent implements OnInit, OnDestroy {
  // Public property to hold the footer background image path for mobile view
  public footerBgImage: string = 'url(\'assets/images/footer-background.png\')';

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
