import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private _userService = inject(UsersService);

  public user = this._userService.currentUser.asReadonly();

}
