import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';

import { DashboardComponent } from './app/features/dashboard/dashboard.component';
import { dashboardRoutes } from './app/features/dashboard/dashboard-routes';
import { NotFound404Component } from './app/features/404/not-found-404/not-found-404.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: DashboardComponent,
                children: dashboardRoutes
            }
        ]
    },
    { path: 'notfound', component: NotFound404Component },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },

    { path: '**', redirectTo: '/notfound' }
];
