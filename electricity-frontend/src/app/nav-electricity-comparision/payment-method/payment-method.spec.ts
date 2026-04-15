import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PaymentMethod } from './payment-method';

describe('PaymentMethod', () => {
  let component: PaymentMethod;
  let fixture: ComponentFixture<PaymentMethod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethod],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
