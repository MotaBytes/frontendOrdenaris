import { MatButtonModule }     from '@angular/material/button';
import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { LoginFormComponent } from '../login/login-form/login-form.component';
import { RegisterFormComponent } from '../register/register-form/register-form.component';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [NgClass, MatButtonModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  private _mode = signal<'login' | 'register'>('login');
  mode = this._mode.asReadonly();

  @Input() set initialMode(v: 'login' | 'register' | undefined) {
    if (v) this._mode.set(v);
  }

  setMode(m: 'login' | 'register') {
    this._mode.set(m);
  }
}
