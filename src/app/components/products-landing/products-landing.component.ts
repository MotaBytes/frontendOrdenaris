import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-products-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-landing.component.html',
})
export class ProductsLandingComponent {

  private productsService = inject(ProductsService);

  public products$!: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.productsService.get4Products(4, 0);
  }
  
}
