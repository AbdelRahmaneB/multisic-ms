import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayList } from './music-sidebar/play-list.model';
import { PlayListService } from './music-sidebar/play-list.service';
import { MusicViewService } from './musicView.service';
import { Principal } from '../shared';

import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { SearchMusicViewComponent } from './search-music-view/search-music-view.component';
import { MusicSidebarComponent } from './music-sidebar/music-sidebar.component';

@Component({
    selector: 'jhi-music-view',
    templateUrl: './musicView.component.html',
    styleUrls: ['musicView.css'],
})
export class MusicViewComponent implements OnInit, OnDestroy {
    @ViewChild(PlaylistViewComponent) playlistView: PlaylistViewComponent;
    @ViewChild(MusicSidebarComponent) musicSidebarView: MusicSidebarComponent;
    @ViewChild(SearchMusicViewComponent)
    searchMusicView: SearchMusicViewComponent;

    playLists: PlayList[];
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedPlaylist: PlayList;
    isSearchMusicSelected = true;

    constructor(
        private playListService: PlayListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private musicViewService: MusicViewService
    ) {}

    loadAll() {
        this.playListService.query().subscribe(
            (res: HttpResponse<PlayList[]>) => {
                this.playLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPlayLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlayLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playListListModification',
            (response) => this.loadAll()
        );
    }

    changePlaylist(playlistId) {
        if (this.isSearchMusicSelected) {
            this.isSearchMusicSelected = false;
        }

        this.selectedPlaylist = this.playLists.find(
            (item) => item.id === playlistId
        );
    }

    selectTrack(track) {
        if (this.isSearchMusicSelected) {
            this.playlistView.playingTrackId = null;
            this.playlistView.selectedTrackId = null;
        } else {
            this.searchMusicView.playingTrackId = null;
            this.searchMusicView.selectedTrackId = null;
        }
        this.musicViewService.selectTrack(track);
    }

    browseMusic(searchMusic) {
        this.selectedPlaylist = null;
        this.musicSidebarView.selectedPlaylist = null;
        this.isSearchMusicSelected = searchMusic;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
