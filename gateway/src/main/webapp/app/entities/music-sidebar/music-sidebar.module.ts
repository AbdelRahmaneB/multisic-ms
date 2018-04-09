import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PlayListService,
    PlayListDetailComponent,
    PlayListDialogComponent,
    PlayListPopupComponent,
    PlayListDeletePopupComponent,
    PlayListDeleteDialogComponent,
    playListRoute,
    playListPopupRoute,
} from './';

const ENTITY_STATES = [...playListRoute, ...playListPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PlayListDetailComponent,
        PlayListDialogComponent,
        PlayListDeleteDialogComponent,
        PlayListPopupComponent,
        PlayListDeletePopupComponent,
    ],
    entryComponents: [
        PlayListDialogComponent,
        PlayListPopupComponent,
        PlayListDeleteDialogComponent,
        PlayListDeletePopupComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultisicMusicSidebarModule {}
