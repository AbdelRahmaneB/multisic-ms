import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TrackService,
    TrackPopupService,
    TrackComponent,
    TrackDetailComponent,
    TrackDialogComponent,
    TrackPopupComponent,
    TrackDeletePopupComponent,
    TrackDeleteDialogComponent,
    trackRoute,
    trackPopupRoute,
} from './';

const ENTITY_STATES = [
    ...trackRoute,
    ...trackPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrackComponent,
        TrackDetailComponent,
        TrackDialogComponent,
        TrackDeleteDialogComponent,
        TrackPopupComponent,
        TrackDeletePopupComponent,
    ],
    entryComponents: [
        TrackComponent,
        TrackDialogComponent,
        TrackPopupComponent,
        TrackDeleteDialogComponent,
        TrackDeletePopupComponent,
    ],
    providers: [
        TrackService,
        TrackPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultisicTrackModule {}
