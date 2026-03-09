import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityComparision } from './electricity-comparision';

describe('ElectricityComparision', () => {
  let component: ElectricityComparision;
  let fixture: ComponentFixture<ElectricityComparision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectricityComparision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricityComparision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
