import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProvider } from './select-provider';

describe('SelectProvider', () => {
  let component: SelectProvider;
  let fixture: ComponentFixture<SelectProvider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProvider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProvider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
