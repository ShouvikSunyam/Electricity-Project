import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Electricity } from "../electricity/electricity";
import { OurServices } from "../our-services/our-services";
import { ComparePrices } from "../compare-prices/compare-prices";
import { Discount } from '../discount/discount';
import { AboutUs } from '../about-us/about-us';
import { OtherServices } from '../other-services/other-services';
import { Gas } from '../gas/gas';
import { NightHeaters } from '../night-heaters/night-heaters';
import { CarElectricity } from '../car-electricity/car-electricity';
import { HeatingElectricity } from '../heating-electricity/heating-electricity';


@Component({
  selector: 'app-home',
  imports: [ MatIconModule, MatInputModule, CommonModule, ComparePrices, Discount, Gas, NightHeaters, CarElectricity, HeatingElectricity],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activeSection: 'household-electricity' | 'gas' | 'heating-electricity' | 'night-heaters' | 'car-electricity' = 'household-electricity';

  setSection(section: any) {
    this.activeSection = section;
  }
}
