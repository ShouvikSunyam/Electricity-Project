import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ApiService } from "../../../shared/services/api.service";
import { AuthService } from "../../../shared/services/auth.service";
import { environment } from "../../../../environments/environment.development";

@Component({
  selector: "app-free-services-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./free-services-list.component.html",
  styleUrl: "./free-services-list.component.css",
})
export class FreeServicesListComponent implements OnInit {
  readonly imgBase = environment.imageBaseUrl;
  
  services: any[] = [];
  isLoading = false;
  errorMessage = "";

  constructor(
    private api: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    const adminId = this.authService.getUserId();

    const payload = {
      adminId: adminId,
    };

    this.isLoading = true;
    this.errorMessage = "";

    this.api.post("admin/get-all-service-menu", payload).subscribe({
      next: (res: any) => {
        if (res.res && res.data) {
          this.services = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Fehler beim Laden der Services.";
        console.error("Fetch error:", err);
      },
    });
  }
}
