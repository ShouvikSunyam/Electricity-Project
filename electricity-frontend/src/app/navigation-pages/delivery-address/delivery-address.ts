import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import flatpickr from 'flatpickr';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-delivery-address',
  imports: [MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './delivery-address.html',
  styleUrl: './delivery-address.css',
})
export class DeliveryAddress {


  selectedDate: Date | null = null;
  date: string = '';


  @ViewChild('dateInput') dateInput!: ElementRef;

  ngAfterViewInit() {
    flatpickr(this.dateInput.nativeElement, {
      dateFormat: "d.m.Y"
    });
  }

}
