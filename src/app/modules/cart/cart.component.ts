import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/interfaces/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private _cartService = inject(CartService);

  public cartItems = this._cartService.cartItems.asReadonly();
  public cartTotal = this._cartService.cartTotal;

  updateQuantity(item: CartItem, newQuantity: number): void {
    this._cartService.updateQuantity(item.product.id, newQuantity);
  }

  removeItem(item: CartItem): void {
    this._cartService.removeFromCart(item.product.id);
  }

}
