import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsNewComponent } from './product-details-new.component';

describe('ProductDetailsNewComponent', () => {
  let component: ProductDetailsNewComponent;
  let fixture: ComponentFixture<ProductDetailsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
