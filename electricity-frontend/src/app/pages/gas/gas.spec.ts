import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gas } from './gas';

describe('Gas', () => {
  let component: Gas;
  let fixture: ComponentFixture<Gas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
