import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-night-heaters',
  imports: [MatIconModule, CommonModule],
  templateUrl: './night-heaters.html',
  styleUrl: './night-heaters.css',
})
export class NightHeaters {
  selectedOption: 'ja' | 'nein' = 'ja';
  selectedTariff: 'single' | 'double' = 'single';

  select(option: 'ja' | 'nein') {
    this.selectedOption = option;

  if (option === 'nein') {
    this.selectedTariff = 'single';
  }

  }

  tariff(type: 'single' | 'double') {
    this.selectedTariff = type;
  }

}
