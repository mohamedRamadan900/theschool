import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';

import { Notfound } from './app/pages/notfound/notfound';
import { SummaryComponent } from './app/pages/summary/summary.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' },
            { path: 'summary', component: SummaryComponent }
        ]
    },
    { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
