import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Routes } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select-provider',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, CommonModule, RouterModule],
  templateUrl: './select-provider.html',
  styleUrl: './select-provider.css',
})
export class SelectProvider {
  constructor(private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private eRef: ElementRef) {}



  discountinfo = `<p> <strong>So haben wir gerechnet </strong> </p>
      <p> Wohnort: <i> Dortmund, 44141 </i>
       Jahresverbrauch: <i> 4.000 kWh </i> </p>
      <p> Günstigster Tarif: immergrün! Spar Smart FairMax, Kosten im ersten Jahr: 920,84 Euro </p>
      <p> Grundversorgungstarif: Dortmunder Energie- und Wasserversorgung GmbH Unser Strom.standard, Kosten: 1.828,72 Euro </p>
      <p><strong>Einsparung: 907,88 Euro</strong> <p>
      <p>(Stand: 16.02.2026) </p>`;

  isOpen = false;

  toggleDiv() {
    this.isOpen = !this.isOpen;
  }

  openPage() {
    this.router.navigate(['login'], { relativeTo: this.route });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }

  selectedOption = 'Sortieren nach: Beste Treffer';

  // info icon dialog box open
  @ViewChild('popoverContainer', { static: false }) popoverContainer!: ElementRef;

  isInfoOpen = false;

  toggleInfo(event: MouseEvent) {
    event.stopPropagation();
    this.isInfoOpen = !this.isInfoOpen;
  }

  @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
    if (!this.isInfoOpen) return;

    const clickedInside = this.popoverContainer?.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isInfoOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.isInfoOpen = false;
  }


  activeTab: string = 'overview'; // default tab
  setTab(tab: string) {
    this.activeTab = tab;
  }

}
