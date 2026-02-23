import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-car-electricity',
  imports: [MatIconModule, CommonModule],
  templateUrl: './car-electricity.html',
  styleUrl: './car-electricity.css',
})
export class CarElectricity {
  selectedOption: 'ja' | 'nein' = 'ja';
  selectedTariff: 'single' | 'double' | null = null;


  select(option: 'ja' | 'nein') {
    this.selectedOption = option;
  }


  tariff(type: 'single' | 'double') {
    this.selectedTariff = type;
  }
}
