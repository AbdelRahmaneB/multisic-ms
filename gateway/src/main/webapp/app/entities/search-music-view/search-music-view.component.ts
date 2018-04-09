import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    HostListener
} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Track } from '../track/track.model';
import { PlayList } from '../music-sidebar/play-list.model';
import { SearchMusicService } from './search-music.service';
import { PlayListService } from '../music-sidebar/play-list.service';
import { TrackService } from '../track/track.service';
import { MusicViewService } from '../musicView.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'jhi-search-music-view',
    templateUrl: './search-music-view.component.html',
    styleUrls: ['search-music-view.css'],
})
export class SearchMusicViewComponent implements OnInit, OnDestroy {
    @Output() newTrack = new EventEmitter<Track>();

    playingTrackId: string = null;
    selectedTrackId: string = null;

    playlists: PlayList[];
    searchResults: any = {};
    currentAccount: any;
    searchField: FormControl;
    loading = false;
    availableProviders: string[];
    subscribers: any = {};
    showPlaylistDropdown = false;
    elementRef;

    @HostListener('document:click')
    handleClick(event) {
        if (this.showPlaylistDropdown) {
            this.showPlaylistDropdown = false;
        }
    }

    constructor(
        private playListService: PlayListService,
        private trackService: TrackService,
        private searchMusicService: SearchMusicService,
        private musicViewService: MusicViewService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private myElement: ElementRef
    ) {
        this.elementRef = myElement;

        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe((id) => {
                this.playingTrackId = id;
            });
    }

    ngOnInit() {
        this.loadAllProviders();
        this.loadAllPlaylists();

        this.registerChangeInPlayLists();
        this.searchField = new FormControl();
        this.searchField.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .do(() => (this.loading = true))
            .map((term) => {
                if (term) {
                    this.availableProviders.map((provider) => {
                        this.searchMusicService
                            .query({
                                query: term,
                                provider,
                            })
                            .do(() => (this.loading = false))
                            .subscribe((results) => {
                                this.searchResults[provider] = results;
                                this.loading = false;
                            });
                    });
                } else {
                    this.availableProviders.map((provider) => {
                        this.searchResults[provider] = [];
                    });
                }
            })
            .subscribe();
    }

    ngOnDestroy() {
        this.subscribers.playPauseTrack.unsubscribe();
        this.subscribers.eventManager.unsubscribe();
    }

    loadAllProviders() {
        this.searchMusicService.queryProviders().then((res) => {
            this.availableProviders = res.body;
            this.initSearch();
        });
    }

    loadAllPlaylists() {
        this.playListService.query().subscribe(
            (res: HttpResponse<PlayList[]>) => {
                this.playlists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    initSearch() {
        this.availableProviders.forEach((provider) => {
            this.searchResults[provider] = [];
        });
    }

    registerChangeInPlayLists() {
        this.subscribers.eventManager = this.eventManager.subscribe(
            'playListListModification',
            (response) => this.loadAllPlaylists()
        );
    }

    changeTrack(track) {
        // Verify if already selected
        if (this.selectedTrackId !== track.id) {
            this.selectedTrackId = track.id;
            this.playingTrackId = null;
            this.musicViewService.setIsSearchMusicPlaying(true);
            this.newTrack.emit(track);
        }
    }

    playTrack(e, track) {
        if (this.playingTrackId === track.id) {
            this.musicViewService.pauseTrack();
            this.musicViewService.setIsSearchMusicPlaying(true);
        } else if (this.selectedTrackId === track.id && !this.playingTrackId) {
            this.musicViewService.playTrack(track.id);
            this.musicViewService.setIsSearchMusicPlaying(true);
        } else {
            this.changeTrack(track);
            this.musicViewService.playNewTrack(track);
        }
        this.showPlaylistDropdown = false;
        e.stopPropagation();
    }

    stopTrack() {
        this.playingTrackId = null;
    }

    openDropdown(e, track) {
        this.changeTrack(track);
        this.showPlaylistDropdown = true;
        e.stopPropagation();
    }

    addToPlaylist(e, playlist, track) {
        this.showPlaylistDropdown = false;

        if (!playlist.tracks.find((t) => t.id === track.id)) {
            // Create own unique id
            const trackWithoutId = Object.assign({}, track);
            delete trackWithoutId.id;
            this.subscribeToTrackResponse(
                this.trackService.create(trackWithoutId),
                playlist
            );
        }
        e.stopPropagation();
    }

    private subscribeToTrackResponse(
        result: Observable<HttpResponse<Track>>,
        playlist: PlayList
    ) {
        result.subscribe((res: HttpResponse<Track>) =>
            this.onSaveTrackSuccess(res.body, playlist)
        );
    }

    onSaveTrackSuccess(track: Track, playlist: PlayList) {
        // Update playlist
        playlist.tracks.push(track);
        this.subscribeToPlaylistResponse(this.playListService.update(playlist));
    }

    private subscribeToPlaylistResponse(
        result: Observable<HttpResponse<PlayList>>
    ) {
        result.subscribe((res: HttpResponse<PlayList>) =>
            this.eventManager.broadcast({
                name: 'playListListModification',
                content: 'OK',
            })
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
