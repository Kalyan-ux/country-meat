import { ComponentFixture, TestBed } from '@angular/core/testing';

// FIX: Corrected the component name from 'ProductDetailsEggsComponent' to 'ProductDetailsComponentEggs'
import { ProductDetailsComponentEggs } from './product-details-eggs.component'; 

// FIX: Corrected the component name in the describe block
describe('ProductDetailsComponentEggs', () => {
  // FIX: Corrected the type definition
  let component: ProductDetailsComponentEggs;
  // FIX: Corrected the type definition
  let fixture: ComponentFixture<ProductDetailsComponentEggs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // FIX: Corrected the component name in imports
      imports: [ProductDetailsComponentEggs]
    })
    .compileComponents();

    // FIX: Corrected the component name in createComponent
    fixture = TestBed.createComponent(ProductDetailsComponentEggs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
