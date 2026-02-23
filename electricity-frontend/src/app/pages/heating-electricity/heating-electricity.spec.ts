import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingElectricity } from './heating-electricity';

describe('HeatingElectricity', () => {
  let component: HeatingElectricity;
  let fixture: ComponentFixture<HeatingElectricity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatingElectricity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatingElectricity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
