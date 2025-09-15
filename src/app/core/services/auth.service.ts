import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';

  private http = inject(HttpClient)

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response && response.access_token) {
          this.saveToken(response.access_token);
        }
      })
    );
  }

  private saveToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}