import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { ContactPerson } from '../../layout/contact-person/contact-person';
import { AboutUs } from '../../pages/about-us/about-us';
import { NeedSupport } from '../../layout/need-support/need-support';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delivery-address',
  imports: [
    Sidebar,
    ContactPerson,
    NeedSupport,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatIcon,
    FormsModule,
    RouterModule,
    AboutUs,
  ],
  templateUrl: './delivery-address.html',
  styleUrl: './delivery-address.css',
})
export class DeliveryAddress implements OnInit {
  readonly CUSTOMER_ID = 1; // Fixed customer ID for now

  // ── Delivery address fields ──────────────────────────────────────────────
  deliveryEmail: string = '';
  deliveryTitle: string = ''; // Dr. / Prof. / Prof. Dr.
  deliveryFirstName: string = '';
  deliveryLastName: string = '';
  deliveryPLZ: string = '12345'; // readonly — pre-filled
  deliveryOrt: string = 'Musterhausen'; // readonly — pre-filled
  deliveryStreet: string = 'Musterstraße'; // readonly — pre-filled
  deliveryHouseNumber: string = '10'; // readonly — pre-filled
  deliveryMobile: string = '';
  deliveryPhone: string = '';
  deliveryDate: Date | null = null;

  // ── Billing address toggle ───────────────────────────────────────────────
  hasDifferentBilling: boolean = false; // false = Nein selected (default)

  // ── Billing address fields (shown only when hasDifferentBilling = true) ──
  billingPLZ: string = '';
  billingOrt: string = '';
  billingStreet: string = '';
  billingHouseNumber: string = '';

  // ── UI state ─────────────────────────────────────────────────────────────
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {}

  /** Toggle title buttons (Dr. / Prof. / Prof. Dr.) */
  selectTitle(title: string): void {
    this.deliveryTitle = this.deliveryTitle === title ? '' : title;
  }

  /** Toggle Ja / Nein for different billing address */
  setBillingToggle(value: boolean): void {
    this.hasDifferentBilling = value;
    // Clear billing fields when user switches to "Nein"
    if (!value) {
      this.billingPLZ = '';
      this.billingOrt = '';
      this.billingStreet = '';
      this.billingHouseNumber = '';
    }
  }

  /** Copy delivery address values into billing address fields */
  copyDeliveryToBilling(): void {
    this.billingPLZ = this.deliveryPLZ;
    this.billingOrt = this.deliveryOrt;
    this.billingStreet = this.deliveryStreet;
    this.billingHouseNumber = this.deliveryHouseNumber;
  }

  /** Build and POST the payload, then navigate to next step */
  openPage(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    // ── Debug: verify all bound values before sending ──────────────────────

    const payload = {
      customerId: this.CUSTOMER_ID,
      deliveryAddress: {
        email: this.deliveryEmail,
        title: this.deliveryTitle,
        firstName: this.deliveryFirstName,
        lastName: this.deliveryLastName,
        mobile: this.deliveryMobile,
        telephone: this.deliveryPhone,
        deliveryDate: this.deliveryDate ? this.formatDate(this.deliveryDate) : null,
        zip: this.deliveryPLZ,
        city: this.deliveryOrt,
        street: this.deliveryStreet,
        houseNumber: this.deliveryHouseNumber,
      },
      billingAddress: {
        different: this.hasDifferentBilling,
        ...(this.hasDifferentBilling && {
          zip: this.billingPLZ,
          city: this.billingOrt,
          street: this.billingStreet,
          houseNumber: this.billingHouseNumber,
        }),
      },
    };

    console.log('Payload being sent to API:', JSON.stringify(payload, null, 2));

    console.log('Payload being sent to API:', JSON.stringify(payload, null, 2));

    this.http.post('http://192.168.0.155:8080/customer/add-delivery', payload).subscribe({
      next: () => {
        
        this.isLoading = false;
        this.successMessage = 'Daten erfolgreich gespeichert.';
        this.router.navigate(['/electricity-comparision/connection-data'], {});
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
        console.error('Delivery address API error:', err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Delivery address API call completed');
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
