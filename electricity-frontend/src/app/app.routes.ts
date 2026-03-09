import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Electricity } from './pages/electricity/electricity';
import { Gas } from './pages/gas/gas';
import { HeatingElectricity } from './pages/heating-electricity/heating-electricity';
import { NightHeaters } from './pages/night-heaters/night-heaters';
import { CarElectricity } from './pages/car-electricity/car-electricity';
import { ElectricityComparision } from './navigation-pages/electricity-comparision/electricity-comparision';
import { GasComparision } from './navigation-pages/gas-comparision/gas-comparision';
import { CommercialElectricity } from './navigation-pages/commercial-electricity/commercial-electricity';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home, children: [
      { path: '', redirectTo: 'electricity', pathMatch: 'full' },
      { path: 'electricity', component: Electricity },
      { path: 'gas', component: Gas },
      { path: 'heating-electricity', component: HeatingElectricity },
      { path: 'night-heaters', component: NightHeaters },
      { path: 'car-electricity', component: CarElectricity },
    ]
  },
  { path: 'electricity-comparision', component: ElectricityComparision },
  { path: 'gas-comparision', component: GasComparision },
  { path: 'commercial-electricity', component: CommercialElectricity },
];
