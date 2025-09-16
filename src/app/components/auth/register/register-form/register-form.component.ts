import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../../core/services/auth.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  protected isLoading = false;
  
  protected formGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    avatar: ['https://picsum.photos/800', [Validators.required]] // URL de avatar por defecto
  });

  get nameInput(): FormControl { return this.formGroup.controls.name as FormControl; }
  get emailInput(): FormControl { return this.formGroup.controls.email as FormControl; }
  get passwordInput(): FormControl { return this.formGroup.controls.password as FormControl; }
  get avatarInput(): FormControl { return this.formGroup.controls.avatar as FormControl; }

  register(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); 
      return;
    }

    this.isLoading = true;
    const userData = {
      name: this.nameInput.value,
      email: this.emailInput.value,
      password: this.passwordInput.value,
      avatar: this.avatarInput.value  
    }

    this.authService.register(userData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (user) => {
        this._snackbar.openSnackBar(`User ${user.name} created successfully! Please log in.`);
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this._snackbar.openSnackBar('An error occurred. The email may already be in use.');
        this.isLoading = false;}
    });
  }
}