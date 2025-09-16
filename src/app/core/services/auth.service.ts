// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from './users/users.service';
import { CreateUserDTO, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';

  private userService = inject(UsersService);
  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => this.saveToken(response.access_token)), 
      switchMap(() => this.getProfile())
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`).pipe(
      tap(user => this.userService.setCurrentUser(user))
    );
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('cart');
    this.userService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }

  private saveToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  initAuthListener(): void {
    const token = this.getToken();
    if (!token) {
      return;
    }
    this.getProfile().subscribe({
      error: () => {
        this.logout();
      }
    });
  }

  register(userData: CreateUserDTO): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/`, userData);
  }
}