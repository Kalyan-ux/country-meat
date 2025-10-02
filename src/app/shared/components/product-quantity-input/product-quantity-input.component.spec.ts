import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityInputComponent } from './product-quantity-input.component';

describe('ProductQuantityInputComponent', () => {
  let component: ProductQuantityInputComponent;
  let fixture: ComponentFixture<ProductQuantityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductQuantityInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductQuantityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
