import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PlayList } from './music-sidebar/play-list.model';
import { Track } from './track/track.model';

@Injectable()
export class MusicViewService {
    private updateTrackSubject: Subject<Track>;
    private selectedTrackSubject: Subject<Track>;
    private playingTrackIdSubject: Subject<string>;
    private playNewTrackSubject: Subject<Track>;
    private removeTrackSubject: Subject<any>;
    private musicSearchViewPlayingTrackSubject: Subject<boolean>;

    constructor() {
        this.updateTrackSubject = new Subject<Track>();
        this.selectedTrackSubject = new Subject<Track>();
        this.playingTrackIdSubject = new Subject<string>();
        this.playNewTrackSubject = new Subject<Track>();
        this.removeTrackSubject = new Subject<any>();
        this.musicSearchViewPlayingTrackSubject = new Subject<boolean>();
    }

    playNewTrack(track) {
        this.playNewTrackSubject.next(track);
    }

    playTrack(trackId) {
        this.playingTrackIdSubject.next(trackId);
    }

    pauseTrack() {
        this.playingTrackIdSubject.next(null);
    }

    selectTrack(track) {
        this.selectedTrackSubject.next(track);
    }

    removeTrack() {
        this.removeTrackSubject.next(null);
    }

    setIsSearchMusicPlaying(isPlaying) {
        this.musicSearchViewPlayingTrackSubject.next(isPlaying);
    }

    getSelectTrackEvent(): Observable<Track> {
        return this.selectedTrackSubject.asObservable();
    }

    getPlayNewTrackTrackEvent(): Observable<Track> {
        return this.playNewTrackSubject.asObservable();
    }

    getPlayingTrackIdEvent(): Observable<string> {
        return this.playingTrackIdSubject.asObservable();
    }

    getRemoveTrackEvent(): Observable<any> {
        return this.removeTrackSubject.asObservable();
    }

    getIsSearchMusicPlaying(): Observable<boolean> {
        return this.musicSearchViewPlayingTrackSubject.asObservable();
    }
}
