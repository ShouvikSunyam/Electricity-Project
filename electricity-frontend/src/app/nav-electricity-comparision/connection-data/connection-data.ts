import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { ContactPerson } from '../../layout/contact-person/contact-person';
import { NeedSupport } from '../../layout/need-support/need-support';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connection-data',
  imports: [
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    Sidebar,
    ContactPerson,
    NeedSupport,
  ],
  templateUrl: './connection-data.html',
  styleUrl: './connection-data.css',
})
export class ConnectionData {
  readonly CUSTOMER_ID = 1;
  readonly DELIVERY_ID = 1;

  // ── Move-in toggle ───────────────────────────────────────────────────────
  selection: string = 'no';

  // ── Connection data fields ───────────────────────────────────────────────
  moveInDate: Date | null = null;
  submitLaterChecked: boolean = false;
  meterNumber: string = '';
  marketLocationId: string = '';

  // ── Cancellation options (only when selection === 'no') ──────────────────
  currentProvider: string = '';
  autoCancellation: boolean = true;
  alreadyCancelled: boolean = false;
  selfCancellation: boolean = false;

  // ── Delivery date options (only when selection === 'no') ─────────────────
  deliveryOption: string = 'schnellstmoeglich'; // 'schnellstmoeglich' | 'wunschtermin'
  desiredDeliveryDate: Date | null = null;

  // ── UI state ─────────────────────────────────────────────────────────────
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  /** Toggle move-in selection (Ja / Nein) */
  selectOption(value: string): void {
    this.selection = value;
    // Reset move-in date when switching away from 'yes'
    if (value !== 'yes') {
      this.moveInDate = null;
    }
  }

  /** Toggle desired delivery option (Schnellstmöglich / Wunschtermin) */
  selectDeliveryOption(value: string): void {
    this.deliveryOption = value;
    if (value !== 'wunschtermin') {
      this.desiredDeliveryDate = null;
    }
  }

  /** Toggle cancellation sub-option (alreadyCancelled / selfCancellation) */
  selectCancellation(type: 'alreadyCancelled' | 'selfCancellation'): void {
    this.alreadyCancelled = type === 'alreadyCancelled';
    this.selfCancellation = type === 'selfCancellation';
  }

  /** Build and POST the payload, then navigate to next step */
  openPage(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    // ── Debug: verify all bound values before sending ──────────────────────
    console.log('Form values before submit:', {
      selection: this.selection,
      moveInDate: this.moveInDate,
      submitLaterChecked: this.submitLaterChecked,
      meterNumber: this.meterNumber,
      marketLocationId: this.marketLocationId,
      currentProvider: this.currentProvider,
      autoCancellation: this.autoCancellation,
      alreadyCancelled: this.alreadyCancelled,
      selfCancellation: this.selfCancellation,
      deliveryOption: this.deliveryOption,
      desiredDeliveryDate: this.desiredDeliveryDate,
    });

    const payload = {
      customerId: this.CUSTOMER_ID,
      deliveryId: this.DELIVERY_ID,
      connectionData: {
      isMovingIn: this.selection === 'yes',
      ...(this.selection === 'yes' && {
        moveInDate: this.moveInDate ? this.formatDate(this.moveInDate) : null,
      }),
      submitLater: this.submitLaterChecked,
      meterNumber: this.meterNumber,
      marketLocationId: this.marketLocationId,
      ...(this.selection === 'no' && {
        currentProvider: this.currentProvider,
        cancellation: {
        autoCancellation: this.autoCancellation,
        alreadyCancelled: this.alreadyCancelled,
        selfCancellation: this.selfCancellation,
        },
        deliveryDate: {
        hasDesiredDate: this.deliveryOption === 'wunschtermin',
        desiredDate:
          this.deliveryOption === 'wunschtermin' && this.desiredDeliveryDate
          ? this.formatDate(this.desiredDeliveryDate)
          : null,
        },
      }),
      },
    };

    console.log('Payload being sent to API:', JSON.stringify(payload, null, 2));

    this.http.post('http://localhost:8080/api/connection-data', payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Daten erfolgreich gespeichert.';
        this.router.navigate(['/electricity-comparision/payment-method'], {});
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
        console.error('Connection data API error:', err);
      },
    });
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
