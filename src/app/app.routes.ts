import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login', loadComponent: () => import('./modules/auth-page/auth-page.component').then(m => m.AuthPageComponent)
    },
    {
        path: 'landing', loadComponent: () => import('./modules/landing-page/landing-page.component').then(m => m.LandingPageComponent),
        children: [
            {
                path: 'products', loadComponent: () => import('./modules/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'cart', loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent)
            },
        ]
    },
    
];
