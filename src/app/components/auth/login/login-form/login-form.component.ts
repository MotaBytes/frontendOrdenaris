import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../../core/services/auth.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  protected isLoading = false;
  protected formGroup = this._formBuilder.group({
      email: ['john@mail.com', [Validators.required, Validators.email]],
      password: ['changeme', [Validators.required]],
    });


  //Metodos

  get emailInput(): FormControl { return this.formGroup.controls.email as FormControl; }
  get passwordInput(): FormControl { return this.formGroup.controls.password as FormControl; }

  ngOnInit(): void {
  }

  login(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); 
      return;
    }
    if (this.formGroup.valid) {
      const credentials = {
        email: this.emailInput.value,
        password: this.passwordInput.value
      };

      this.isLoading = true;
      this.authService.login(credentials).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (user) => {
          this.router.navigate(['/landing/products']);
          this._snackbar.openSnackBar(`Bienvenido, ${user.name}`);

        },
        error: () => {
          this._snackbar.openSnackBar('Usuario o contraseña incorrectos.')
          this.emailInput.reset();
          this.passwordInput.reset();
          this.isLoading = false;
        }
      });


    }
  }
}