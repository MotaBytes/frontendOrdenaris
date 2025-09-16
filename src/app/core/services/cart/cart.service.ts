import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartItem } from '../../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: WritableSignal<CartItem[]> = signal<CartItem[]>([]);

  public cartCount: Signal<number> = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  public cartTotal: Signal<number> = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  constructor() {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.cartItems.set(JSON.parse(storedCart));
    }
  }

  public addToCart(product: Product, quantity: number = 1): void {
    this.cartItems.update(items => {
      const itemInCart = items.find(item => item.product.id === product.id);
      if (itemInCart) {
        itemInCart.quantity += quantity;
        return [...items];
      } else {
        return [...items, { product, quantity }];
      }
    });
    this._saveCart();
  }
  
  public updateQuantity(productId: number, newQuantity: number): void {
    this.cartItems.update(items => 
      items.map(item => 
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
    this._saveCart();
  }

  public removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
    this._saveCart();
  }

  private _saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

}
