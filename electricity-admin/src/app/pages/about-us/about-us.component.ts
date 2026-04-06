import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  description = "";
  imageFile: File | null = null;
  imagePreview: string | null = null;

  isLoading = false;
  errorMessage = "";

  constructor(private api: ApiService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      this.errorMessage = "Nur Bilddateien sind erlaubt";
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

  onSubmit() {
    if (!this.description || !this.imageFile) {
      this.errorMessage = "Bild und Beschreibung sind erforderlich";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    const formData = new FormData();
    formData.append("image", this.imageFile);
    formData.append("description", this.description);

    this.api.post("admin/about-us/update", formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert("✅ Über uns erfolgreich aktualisiert");
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Fehler beim Speichern der Daten";
      },
    });
  }
}