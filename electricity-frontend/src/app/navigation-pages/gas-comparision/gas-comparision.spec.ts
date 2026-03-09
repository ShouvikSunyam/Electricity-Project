import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasComparision } from './gas-comparision';

describe('GasComparision', () => {
  let component: GasComparision;
  let fixture: ComponentFixture<GasComparision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasComparision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasComparision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
