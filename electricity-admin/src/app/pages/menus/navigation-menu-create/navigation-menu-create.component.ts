import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../../shared/services/api.service";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: "app-navigation-menu-create",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./navigation-menu-create.component.html",
  styleUrl: "./navigation-menu-create.component.css",
})
export class NavigationMenuCreateComponent {
  title = "";
  subtitle = "";
  imageFile: File | null = null;
  imagePreview: string | null = null;

  isLoading = false;
  errorMessage = "";

  constructor(private api: ApiService, private authService: AuthService) {}

  /* ================= FILE ================= */

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    /* 🔒 validation */
    if (!file.type.startsWith("image/")) {
      this.errorMessage = "Only image files allowed";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = "Image must be less than 2MB";
      return;
    }

    this.errorMessage = "";
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /* ================= SUBMIT ================= */

  onSubmit() {
    const adminId = this.authService.getUserId();

    if (!this.title || !this.imageFile) {
      this.errorMessage = "Title and Image are required";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    const payload = {
      adminId: adminId,
      heading: this.title,
      subHeading: this.subtitle || "",
      type: 1,
    };

    const formData = new FormData();
    formData.append("file", this.imageFile);
    formData.append("data", JSON.stringify(payload));

    this.api.post("admin/add-menu", formData).subscribe({
      next: (res) => {
        console.log(res);

        this.isLoading = false;

        /* reset form */
        this.title = "";
        this.subtitle = "";
        this.imageFile = null;
        this.imagePreview = null;

        alert("✅ Menu created successfully");
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;

        if (err?.error?.res === false) {
          this.errorMessage = err.error.errorMessage;
        } else {
          this.errorMessage = "Something went wrong";
        }
      },
    });
  }
}
