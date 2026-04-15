import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DeliveryAddress } from './delivery-address';

describe('DeliveryAddress', () => {
  let component: DeliveryAddress;
  let fixture: ComponentFixture<DeliveryAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAddress],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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
