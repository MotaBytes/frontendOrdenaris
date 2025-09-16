import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CategoriesProductsComponent } from '../../components/categories-products/categories-products.component';
import { ProductsLandingComponent } from '../../components/products-landing/products-landing.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CarouselComponent,
    CategoriesProductsComponent,
    ProductsLandingComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
