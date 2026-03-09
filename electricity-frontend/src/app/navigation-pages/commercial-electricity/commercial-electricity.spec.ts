import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialElectricity } from './commercial-electricity';

describe('CommercialElectricity', () => {
  let component: CommercialElectricity;
  let fixture: ComponentFixture<CommercialElectricity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialElectricity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialElectricity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
