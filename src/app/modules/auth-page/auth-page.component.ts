import { Component } from '@angular/core';
import { CardFormsComponent } from '../../components/auth/card-forms/card-forms.component';
import { CardFormsMobileComponent } from '../../components/auth/card-forms-mobile/card-forms-mobile.component';
import { AuthFormComponent } from '../../components/auth/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CardFormsComponent, CardFormsMobileComponent, AuthFormComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {

}
