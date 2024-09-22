import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandsComponent } from './product-brands.component';

describe('ProductBrandsComponent', () => {
  let component: ProductBrandsComponent;
  let fixture: ComponentFixture<ProductBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductBrandsComponent]
    });
    fixture = TestBed.createComponent(ProductBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
