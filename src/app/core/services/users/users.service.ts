// src/app/core/services/user.service.ts
import { Injectable, signal } from '@angular/core';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public readonly currentUser = signal<User | null>(null);

  public setCurrentUser(user: User | null): void {
    this.currentUser.set(user);
  }
}