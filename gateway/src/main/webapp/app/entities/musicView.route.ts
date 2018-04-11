import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { MusicViewComponent } from './musicView.component';

export const musicViewRoutes: Routes = [
    {
        path: 'music',
        component: MusicViewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Music View',
        },
        canActivate: [UserRouteAccessService],
    },
];
