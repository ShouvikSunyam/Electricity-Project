import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { ContactPerson } from '../../layout/contact-person/contact-person';
import { NeedSupport } from '../../layout/need-support/need-support';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

const API_BASE = 'http://192.168.0.155:8080';

@Component({
  selector: 'app-delivery-address',
  standalone: true,
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
  ],
  templateUrl: './delivery-address.html',
  styleUrl: './delivery-address.css',
})
export class DeliveryAddress implements OnInit {
  // ── Delivery address fields ──────────────────────────────────────────────
  deliveryEmail: string = '';
  deliveryTitle: string = '';
  deliveryFirstName: string = '';
  deliveryLastName: string = '';
  deliveryPLZ: string = '12345';
  deliveryOrt: string = 'Musterhausen';
  deliveryStreet: string = 'Musterstraße';
  deliveryHouseNumber: string = '10';
  deliveryMobile: string = '';
  deliveryPhone: string = '';
  deliveryDate: Date | null = null;

  // ── Billing address toggle ───────────────────────────────────────────────
  hasDifferentBilling: boolean = false;

  // ── Billing address fields ───────────────────────────────────────────────
  billingPLZ: string = '';
  billingOrt: string = '';
  billingStreet: string = '';
  billingHouseNumber: string = '';

  // ── UI state ─────────────────────────────────────────────────────────────
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  validationErrors: Record<string, string> = {};

  private readonly mainStepRoutes: Record<number, string> = {
    1: '/electricity-comparision/register',
    2: '/electricity-comparision/delivery-address',
    3: '/electricity-comparision/connection-data',
    4: '/electricity-comparision/payment-method',
    5: '/electricity-comparision/checkout',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Since deliveryId is the same as userId, we fetch immediately
    const userId = this.authService.getUserId();

    if (userId) {
      this.fetchFormData(userId);
    }

    this.authService.getAuthState().subscribe((user) => {
      if (user?.email && !this.deliveryEmail) {
        this.deliveryEmail = user.email;
      }
    });
  }

  fetchFormData(id: string): void {
    this.isLoading = true;
    const payload = {
      customerId: parseInt(id, 10),
      deliveryId: parseInt(id, 10), // Same as userId per your requirement
      step: 0,
    };

    this.http.post<any>(`${API_BASE}/customer/fetch-form`, payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.res && res.data) {
          this.prefillForm(res.data);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Fetch error:', err);
      },
    });
  }

  private prefillForm(data: any): void {
    const addr = data.deliveryAddress || data.address || data.customerAddress || data;
    const bill = data.billingAddress;

    this.deliveryEmail = data.email || this.deliveryEmail;
    this.deliveryTitle = data.title || '';
    this.deliveryFirstName = data.firstName || '';
    this.deliveryLastName = data.lastName || '';
    this.deliveryMobile = data.mobile || '';
    this.deliveryPhone = data.telephone || '';

    // Parse Date
    if (data.deliveryDate) {
      const parsedDate = new Date(data.deliveryDate);
      this.deliveryDate = isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    // Readonly fields
    this.deliveryPLZ = addr?.zip || addr?.plz || this.deliveryPLZ;
    this.deliveryOrt = addr?.city || addr?.ort || this.deliveryOrt;
    this.deliveryStreet = addr?.street || addr?.strasse || this.deliveryStreet;
    this.deliveryHouseNumber = addr?.houseNumber || addr?.hausnummer || this.deliveryHouseNumber;

    // Billing toggle & fields
    this.hasDifferentBilling = !!(bill?.different || bill?.isDifferent);
    if (this.hasDifferentBilling) {
      this.billingPLZ = bill?.zip || '';
      this.billingOrt = bill?.city || '';
      this.billingStreet = bill?.street || '';
      this.billingHouseNumber = bill?.houseNumber || '';
    }
  }

  selectTitle(title: string): void {
    this.deliveryTitle = this.deliveryTitle === title ? '' : title;
  }

  setBillingToggle(value: boolean): void {
    this.hasDifferentBilling = value;
  }

  navigateToMainStep(step: number): void {
    const route = this.mainStepRoutes[step];
    if (route) this.router.navigate([route]);
  }

  openPage(): void {
    // Add your save logic here, then navigate
    this.router.navigate([this.mainStepRoutes[3]]);
  }
}
