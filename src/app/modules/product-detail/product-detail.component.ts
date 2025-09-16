import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/interfaces/product';
import { SnackbarService } from '../../core/services/snackbar.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private _snackbar = inject(SnackbarService);
  private _cartService = inject(CartService);

  public product$!: Observable<Product>;
  public selectedImage = signal<string | undefined>(undefined);
  public quantity = signal(1);
  public product!: Product;

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productsService.getProductById(id);
      })
    );
    
    this.product$.subscribe(product => {
      if (product && product.images.length > 0) {
        this.selectedImage.set(product.images[0]);
      }
    });
  }
  
  addToCart(product: Product): void {
    this._cartService.addToCart(product, this.quantity());
    this._snackbar.openSnackBar(`${this.quantity()} x ${product.title} added to cart!`);
  }

  changeImage(imageUrl: string): void {
    this.selectedImage.set(imageUrl);
  }

  incrementQuantity(): void {
    this.quantity.update(value => value + 1);
  }

  decrementQuantity(): void {
    this.quantity.update(value => (value > 1 ? value - 1 : 1));
  }
}
