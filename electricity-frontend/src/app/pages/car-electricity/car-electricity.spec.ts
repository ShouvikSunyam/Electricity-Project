import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarElectricity } from './car-electricity';

describe('CarElectricity', () => {
  let component: CarElectricity;
  let fixture: ComponentFixture<CarElectricity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarElectricity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarElectricity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
