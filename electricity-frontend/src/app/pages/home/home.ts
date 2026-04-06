import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Discount } from '../discount/discount';
import { NeedSupport } from '../../layout/need-support/need-support';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatInputModule, CommonModule, Discount, RouterModule, NeedSupport],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly BASE_IMAGE_URL = 'http://192.168.0.155:8080/assets/super-admin/';
  sidebarItems: any[] = [];
  freeServices: any[] = [];
  isLoading = true;

  // Map original filenames to the specific CSS classes from your static HTML
  private readonly ICON_CLASS_MAP: Record<string, string> = {
    'Stromvergleich.png': 'icon-cable',
    'Gasvergleich.png': 'icon',
    'Warmepumpe.png': 'icon-pump',
    'Nachtspeicherofen.png': 'icon',
    'Ladestrom.png': 'icon',
  };

  // Map original filenames to their internal routes
  private readonly ROUTE_MAP: Record<string, string> = {
    'Stromvergleich.png': '/home/electricity',
    'Gasvergleich.png': '/home/gas',
    'Warmepumpe.png': '/home/heating-electricity',
    'Nachtspeicherofen.png': '/home/night-heaters',
    'Ladestrom.png': '/home/car-electricity',
  };

  // Map original filenames to the custom display labels
  private readonly LABEL_MAP: Record<string, string> = {
    'Stromvergleich.png': 'Strom | Hausstrom',
    'Gasvergleich.png': 'Gas',
    'Warmepumpe.png': 'Heizstrom | Wärmepumpe',
    'Nachtspeicherofen.png': 'Heizstrom | Nachtspeicher',
    'Ladestrom.png': 'Ladestrom | Autostrom',
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.http.post<any>('http://192.168.0.155:8080/api/content', {}).subscribe({
      next: (data) => {
        if (data?.res && data?.menu?.sidebar) {
          // Sort items by the 'order' property from API
          this.sidebarItems = [...data.menu.sidebar].sort((a, b) => a.order - b.order);
        }

        // New Free Service logic from the 'service' object
        if (data.service?.['free-service']) {
          // Filter to only show items that are NOT highlighted, if that matches your design
          this.freeServices = data.service['free-service']
            .filter((s: any) => s.highlight === 0)
            .sort((a: any, b: any) => a.order - b.order);
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Home data load failed', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  getImageUrl(contentUrl: string): string {
    return `${this.BASE_IMAGE_URL}${contentUrl}`;
  }

  getIconClass(fileName: string): string {
    return this.ICON_CLASS_MAP[fileName] || 'icon';
  }

  getRouterLink(fileName: string): string {
    return this.ROUTE_MAP[fileName] || '/home';
  }

  getLabel(fileName: string): string {
    return this.LABEL_MAP[fileName] || 'Service';
  }
}
