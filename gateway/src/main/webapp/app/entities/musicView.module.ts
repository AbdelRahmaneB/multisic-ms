import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';
import { MusicViewComponent, musicViewRoutes } from './';
import { PlayListService } from './music-sidebar/play-list.service';
import { PlayListPopupService } from './music-sidebar/play-list-popup.service';
import { SearchMusicService } from './search-music-view/search-music.service';
import { MusicViewService } from './musicView.service';
import { MusicSidebarComponent } from './music-sidebar/music-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MultisicMusicSidebarModule } from './music-sidebar/music-sidebar.module';
import { MultisicTrackModule } from './track/track.module';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { SearchMusicViewComponent } from './search-music-view/search-music-view.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */
const MUSIC_STATES = [...musicViewRoutes];

@NgModule({
    imports: [
        GatewaySharedModule,
        MultisicMusicSidebarModule,
        MultisicTrackModule,
        RouterModule.forChild(MUSIC_STATES),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MusicViewComponent,
        MusicSidebarComponent,
        PlaylistViewComponent,
        SearchMusicViewComponent,
        AudioPlayerComponent,
    ],
    entryComponents: [MusicViewComponent],
    providers: [
        PlayListService,
        PlayListPopupService,
        SearchMusicService,
        MusicViewService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultisicMusicViewModule {}
