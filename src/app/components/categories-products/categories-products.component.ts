import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../core/interfaces/category';


@Component({
  selector: 'app-categories-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-products.component.html',
})
export class CategoriesProductsComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  public categories$!: Observable<Category[]>;

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
  }
}