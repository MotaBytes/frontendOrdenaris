import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UsersService } from '../../core/services/users/users.service';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] 
})
export class SidebarComponent implements OnInit {
   private userService = inject(UsersService);
   private authService = inject(AuthService);
   private router = inject(Router);
   public user = this.userService.currentUser.asReadonly(); 
   public isExpanded = false;
   public activeRoute: string = ''; 

   ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateActiveRoute(event.urlAfterRedirects);
    });

    this.updateActiveRoute(this.router.url);
  }

  private updateActiveRoute(url: string): void {
  if (url.includes('/categories')) {
    this.activeRoute = 'Categories';
  } else if (url.includes('/cart')) {
    this.activeRoute = 'Cart';
  } else if (url.includes('/profile')) {
    this.activeRoute = 'Profile';
  } else {
    this.activeRoute = 'Home';
  }
}

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