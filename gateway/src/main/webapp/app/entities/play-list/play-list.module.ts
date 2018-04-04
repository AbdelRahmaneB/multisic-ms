import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PlayListService,
    PlayListPopupService,
    PlayListComponent,
    PlayListDetailComponent,
    PlayListDialogComponent,
    PlayListPopupComponent,
    PlayListDeletePopupComponent,
    PlayListDeleteDialogComponent,
    playListRoute,
    playListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...playListRoute,
    ...playListPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlayListComponent,
        PlayListDetailComponent,
        PlayListDialogComponent,
        PlayListDeleteDialogComponent,
        PlayListPopupComponent,
        PlayListDeletePopupComponent,
    ],
    entryComponents: [
        PlayListComponent,
        PlayListDialogComponent,
        PlayListPopupComponent,
        PlayListDeleteDialogComponent,
        PlayListDeletePopupComponent,
    ],
    providers: [
        PlayListService,
        PlayListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPlayListModule {}
