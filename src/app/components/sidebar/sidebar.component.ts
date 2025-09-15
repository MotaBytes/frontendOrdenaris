import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UsersService } from '../../core/services/users/users.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] 
})
export class SidebarComponent {
   private userService = inject(UsersService);
   private authService = inject(AuthService); 
   public user = this.userService.currentUser.asReadonly(); 
   public isExpanded = false;

  activeRoute: string = 'Home'; 

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  setActiveRoute(routeName: string): void {
    this.activeRoute = routeName;
    this.isExpanded = false; 
  }
  logout(): void {
    this.authService.logout();
  }
}