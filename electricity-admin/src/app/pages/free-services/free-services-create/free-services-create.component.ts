import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { ApiService } from "../../../shared/services/api.service";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: "app-free-services-create",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./free-services-create.component.html",
  styleUrl: "./free-services-create.component.css",
})
export class FreeServicesCreateComponent {
  title: string = "";
  description: string = "";
  isFreeService: boolean = true;
  isHighlighted: boolean = false;

  imageFile: File | null = null;
  imagePreview: string | null = null;

  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(
    private api: ApiService,
    private router: Router,
    private authService: AuthService,
  ) {}

  // Logic to handle the switch change
  onTypeChange() {
    // If it's NOT a free service (meaning it's 'Other')
    if (!this.isFreeService) {
      // Highlight is not allowed for 'Other' services
      this.isHighlighted = false;
    } else {
      // If switching back to 'Free', clear the image
      this.imageFile = null;
      this.imagePreview = null;
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = "Bild muss kleiner als 2MB sein";
        return;
      }
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const adminId = this.authService.getUserId();

    if (!this.title.trim()) {
      this.errorMessage = "Titel und Beschreibung sind erforderlich";
      return;
    }

    // Only require image if it is an 'Other' service
    if (!this.isFreeService && !this.imageFile) {
      this.errorMessage = "Ein Bild ist für 'Andere Services' erforderlich";
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    const payload = {
      adminId: adminId,
      heading: this.title,
      subheading: this.description,
      type: this.isFreeService ? 1 : 2,
      highlight: this.isHighlighted ? 1 : 0,
    };

    formData.append("data", JSON.stringify(payload));
    if (this.imageFile) {
      formData.append("file", this.imageFile);
    }

    this.api.post("admin/add-service-menu", formData).subscribe({
      next: () => {
        this.isLoading = false;
        alert("✅ Service erfolgreich gespeichert!");
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = "Fehler beim Speichern";
      },
    });
  }
}
