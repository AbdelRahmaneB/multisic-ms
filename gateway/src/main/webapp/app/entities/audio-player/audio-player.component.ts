import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    ViewChild,
    EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlayList } from '../music-sidebar/play-list.model';
import { Track } from '../track/track.model';
import { MusicViewService } from '../musicView.service';

// ex : http://static.videogular.com/assets/audios/videogular.mp3
@Component({
    selector: 'jhi-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['audio-player.css'],
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
    subscribers: any = {};
    audioPlayerTrack: Track;

    @ViewChild('audio') player: any;
    @Input() selectedPlaylist: PlayList;
    isPlaylistPlaying = false;
    isSelected = false;

    constructor(private musicViewService: MusicViewService) {
        this.subscribers.selectTrack = musicViewService
            .getSelectTrackEvent()
            .subscribe((track) => {
                this.selectTrack(track);
            });

        this.subscribers.playNewTrack = musicViewService
            .getPlayNewTrackTrackEvent()
            .subscribe((track) => {
                this.selectTrack(track);
                this.playNewTrack(track);
            });

        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe((id) => {
                if (id) {
                    this.play();
                } else {
                    this.pause();
                }
            });

        this.subscribers.removeTrack = musicViewService
            .getRemoveTrackEvent()
            .subscribe(() => {
                this.removeTrack();
            });

        this.subscribers.searchMusicPlayingTrack = musicViewService
            .getIsSearchMusicPlaying()
            .subscribe((isSearchMusicPlaying) => {
                this.isPlaylistPlaying = !isSearchMusicPlaying;
            });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscribers.selectTrack.unsubscribe();
        this.subscribers.playNewTrack.unsubscribe();
        this.subscribers.playPauseTrack.unsubscribe();
    }

    playNewTrack(track: Track) {
        this.player.nativeElement.load();
        this.onPlay();
    }

    playPreviousSong() {
        if (this.selectedPlaylist && this.isPlaylistPlaying) {
            const currentIndex = this.selectedPlaylist.tracks.findIndex(
                (track) => track.id === this.audioPlayerTrack.id
            );
            let previousIndex = (currentIndex - 1);
            if (previousIndex < 0) {
                previousIndex = this.selectedPlaylist.tracks.length - 1;
            }
            const previousTrack = this.selectedPlaylist.tracks[previousIndex];
            this.player.nativeElement.src = previousTrack.previewurl;

            this.player.nativeElement.load();
            this.musicViewService.playNewTrack(previousTrack);
        } else {
            this.player.nativeElement.load(); // reset song
        }
    }

    playNextSong() {
        if (this.selectedPlaylist && this.isPlaylistPlaying) {
            const currentIndex = this.selectedPlaylist.tracks.findIndex(
                (track) => track.id === this.audioPlayerTrack.id
            );
            const nextIndex =
                (currentIndex + 1) % this.selectedPlaylist.tracks.length;
            const nextTrack = this.selectedPlaylist.tracks[nextIndex];
            this.player.nativeElement.src = nextTrack.previewurl;
            this.player.nativeElement.load();
            this.musicViewService.playNewTrack(nextTrack);
        } else {
            this.player.nativeElement.load(); // reset song
        }
    }

    selectTrack(track) {
        this.isSelected = true;
        this.audioPlayerTrack = track;
        this.player.nativeElement.src = track.previewurl;
    }

    play() {
        this.player.nativeElement.play();
    }

    pause() {
        this.player.nativeElement.pause();
    }

    onPlay() {
        if (this.selectedPlaylist) {
            this.isPlaylistPlaying = true;
        }

        this.musicViewService.playTrack(this.audioPlayerTrack.id);
        this.play();
    }

    onPause() {
        this.musicViewService.pauseTrack();
        this.pause();
    }

    removeTrack() {
        this.player.nativeElement.pause();
        this.player.nativeElement.src = '';
        this.audioPlayerTrack = null;
    }

    previousTrack() {
        this.playPreviousSong();
    }

    nextTrack() {
        this.playNextSong();
    }

    displayTrackInfo(info) {
        const expansion = info.length > 30 ? '...' : '';
        const shortTrackInfo = info.substring(0, 30);
        return shortTrackInfo + expansion;
    }
}
