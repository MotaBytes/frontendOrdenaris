import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login', loadComponent: () => import('./modules/auth-page/auth-page.component').then(m => m.AuthPageComponent)
    }
];
