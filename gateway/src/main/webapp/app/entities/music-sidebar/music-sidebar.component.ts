import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayList } from './play-list.model';
import { PlayListService } from './play-list.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-music-sidebar',
    templateUrl: './music-sidebar.component.html',
    styleUrls: ['music-sidebar.css'],
})
export class MusicSidebarComponent implements OnInit, OnDestroy {
    @Input() playLists: PlayList[];
    @Output() getPlaylistChange = new EventEmitter<number>();
    @Output() getIsSearchMusic = new EventEmitter<boolean>();
    selectedPlaylist = null;

    constructor(private jhiAlertService: JhiAlertService) {}
    ngOnInit() {}

    ngOnDestroy() {}

    selectPlaylist(id) {
        this.selectedPlaylist = id;
        this.getPlaylistChange.emit(id);
    }

    browseMusic() {
        this.getIsSearchMusic.emit(true);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
