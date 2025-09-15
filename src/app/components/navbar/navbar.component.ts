import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { AuthService } from '../../core/services/auth.service';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private userService = inject(UsersService);
  private authService = inject(AuthService); 
  protected links = [{ label: 'Productos', to: '/productos' }];
  protected categories = ['Cargadores', 'Fundas', 'Cables', 'Audífonos'];
  protected cartCount = signal(1);
  protected isLoggedIn = false;
  public user = this.userService.currentUser.asReadonly();
  public isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  logout(): void {
    this.authService.logout();
  }
}
