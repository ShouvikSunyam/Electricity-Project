import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddress } from './delivery-address';

describe('DeliveryAddress', () => {
  let component: DeliveryAddress;
  let fixture: ComponentFixture<DeliveryAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
