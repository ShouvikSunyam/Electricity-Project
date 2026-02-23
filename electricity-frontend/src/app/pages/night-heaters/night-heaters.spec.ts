import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightHeaters } from './night-heaters';

describe('NightHeaters', () => {
  let component: NightHeaters;
  let fixture: ComponentFixture<NightHeaters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NightHeaters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightHeaters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
