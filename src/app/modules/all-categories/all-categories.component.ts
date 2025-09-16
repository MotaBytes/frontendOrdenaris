import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoryWithProducts } from '../../core/interfaces/category';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ScrollProductsDirective } from '../../core/directives/scroll-products.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinner,
    ScrollProductsDirective,
    RouterLink
  ],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  private productsService = inject(ProductsService);
  
  public categoriesWithProducts: CategoryWithProducts[] = [];
  private readonly initialLimit = 10;

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categoriesWithProducts = categories.map(cat => ({
        ...cat,
        products: [],
        offset: 0,
        limit: this.initialLimit,
        loading: false,
        allProductsLoaded: false,
      }));
      this.categoriesWithProducts.forEach(cat => this.loadProductsForCategory(cat));
    });
  }

  loadProductsForCategory(category: CategoryWithProducts): void {
    if (category.loading || category.allProductsLoaded) return;

    category.loading = true;
    this.productsService.getProductsByCategory(category.id, category.limit, category.offset)
      .subscribe(newProducts => {
        if (newProducts.length > 0) {
          category.products.push(...newProducts);
          category.offset += category.limit;
        } else {
          category.allProductsLoaded = true;
        }
        category.loading = false;
      });
  }

}
