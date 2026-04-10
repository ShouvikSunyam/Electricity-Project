import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContactPerson } from '../../layout/contact-person/contact-person';
import { NeedSupport } from '../../layout/need-support/need-support';
import { Sidebar } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-payment-method',
  imports: [
    Sidebar,
    ContactPerson,
    NeedSupport,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.css',
})
export class PaymentMethod {
  readonly CUSTOMER_ID = 1;
  readonly DELIVERY_ID = 1;

  // ── Payment method toggle ────────────────────────────────────────────────
  paymentMethod: string = 'ueberweisung'; // 'lastschrift' | 'ueberweisung'

  // ── SEPA / Lastschrift fields ────────────────────────────────────────────
  iban: string = '';
  firstName: string = '';
  lastName: string = '';
  sepaConsent: boolean = false;

  // ── UI state ─────────────────────────────────────────────────────────────
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  /** Toggle payment method (Lastschrift / Überweisung) */
  selectPaymentMethod(value: string): void {
    this.paymentMethod = value;
    // Reset SEPA fields when switching away from Lastschrift
    if (value !== 'lastschrift') {
      this.iban = '';
      this.firstName = '';
      this.lastName = '';
      this.sepaConsent = false;
    }
  }

  /** Build and POST the payload, then navigate to next step */
  openPage(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    // ── Debug: verify all bound values before sending ──────────────────────
    console.log('Form values before submit:', {
      paymentMethod: this.paymentMethod,
      iban: this.iban,
      firstName: this.firstName,
      lastName: this.lastName,
      sepaConsent: this.sepaConsent,
    });

    const payload = {
      customerId: this.CUSTOMER_ID,
      deliveryId: this.DELIVERY_ID,
      paymentData: {
        paymentMethod: this.paymentMethod,
        ...(this.paymentMethod === 'lastschrift' && {
          iban: this.iban,
          accountHolder: {
            firstName: this.firstName,
            lastName: this.lastName,
          },
          sepaConsent: this.sepaConsent,
        }),
      },
    };

    console.log('Payload being sent to API:', JSON.stringify(payload, null, 2));

    this.http.post('http://localhost:8080/api/payment-method', payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Zahlungsart erfolgreich gespeichert.';
        this.router.navigate(['/electricity-comparision/checkout'], {});
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
        console.error('Payment method API error:', err);
      },
    });
  }
}
