import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsEggsComponent } from './product-details-eggs.component';

describe('ProductDetailsEggsComponent', () => {
  let component: ProductDetailsEggsComponent;
  let fixture: ComponentFixture<ProductDetailsEggsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsEggsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
