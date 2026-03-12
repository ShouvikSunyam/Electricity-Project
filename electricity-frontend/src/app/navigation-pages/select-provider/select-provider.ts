import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-select-provider',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, CommonModule, RouterModule],
  templateUrl: './select-provider.html',
  styleUrl: './select-provider.css',
})
export class SelectProvider {
  constructor(private router: Router, private route: ActivatedRoute) {}

  isOpen = false;

  toggleDiv() {
    this.isOpen = !this.isOpen;
  }

  openPage() {

    this.router.navigate(['delivery-address'], { relativeTo: this.route });
  }
}
