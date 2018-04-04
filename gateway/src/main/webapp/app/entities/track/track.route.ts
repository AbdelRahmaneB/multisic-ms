import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TrackComponent } from './track.component';
import { TrackDetailComponent } from './track-detail.component';
import { TrackPopupComponent } from './track-dialog.component';
import { TrackDeletePopupComponent } from './track-delete-dialog.component';

export const trackRoute: Routes = [
    {
        path: 'track',
        component: TrackComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tracks'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'track/:id',
        component: TrackDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tracks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trackPopupRoute: Routes = [
    {
        path: 'track-new',
        component: TrackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tracks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track/:id/edit',
        component: TrackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tracks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track/:id/delete',
        component: TrackDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tracks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
