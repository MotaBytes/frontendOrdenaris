import { Component, Input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatIconModule }       from '@angular/material/icon';
import { MatButtonModule }     from '@angular/material/button';
import { MatCheckboxModule }   from '@angular/material/checkbox';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

}
