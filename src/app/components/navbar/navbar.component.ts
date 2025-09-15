// src/app/shared/navbar/navbar.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    SearchInputComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  links = [{ label: 'Productos', to: '/productos' }];
  categories = ['Cargadores', 'Fundas', 'Cables', 'Audífonos'];
  user = { initials: 'AG', name: 'Alejandro Gonzalez' };
  cartCount = signal(1);
}
