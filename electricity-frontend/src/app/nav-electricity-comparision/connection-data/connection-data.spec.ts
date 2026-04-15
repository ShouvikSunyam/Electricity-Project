import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ConnectionData } from './connection-data';

describe('ConnectionData', () => {
  let component: ConnectionData;
  let fixture: ComponentFixture<ConnectionData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionData],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
