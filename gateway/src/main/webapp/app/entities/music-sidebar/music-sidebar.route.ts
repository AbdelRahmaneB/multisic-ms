import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PlayListDetailComponent } from './play-list-detail.component';
import { PlayListPopupComponent } from './play-list-dialog.component';
import { PlayListDeletePopupComponent } from './play-list-delete-dialog.component';

export const playListRoute: Routes = [
    {
        path: 'play-list/:id',
        component: PlayListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PlayLists',
        },
        canActivate: [UserRouteAccessService],
    },
];

export const playListPopupRoute: Routes = [
    {
        path: 'play-list-new',
        component: PlayListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PlayLists',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup',
    },
    {
        path: 'play-list/:id/edit',
        component: PlayListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PlayLists',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup',
    },
    {
        path: 'play-list/:id/delete',
        component: PlayListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PlayLists',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup',
    },
];
