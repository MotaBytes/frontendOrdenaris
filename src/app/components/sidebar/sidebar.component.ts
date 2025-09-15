import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] 
})
export class SidebarComponent {
  isExpanded = false;

  activeRoute: string = 'Home'; 

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  setActiveRoute(routeName: string): void {
    this.activeRoute = routeName;
    this.isExpanded = false; 
  }
}