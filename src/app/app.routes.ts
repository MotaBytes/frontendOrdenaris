import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login', loadComponent: () => import('./modules/auth-page/auth-page.component').then(m => m.AuthPageComponent)
    },
    {
        path: 'landing', loadComponent: () => import('./modules/landing-page/landing-page.component').then(m => m.LandingPageComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'products', loadComponent: () => import('./modules/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'product/:id', loadComponent: () => import('./modules/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            },
            {
                path: 'categories', loadComponent: () => import('./modules/all-categories/all-categories.component').then(m => m.AllCategoriesComponent)
            },
            {
                path: 'cart', loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent)
            },
        ]
    },
    
];
