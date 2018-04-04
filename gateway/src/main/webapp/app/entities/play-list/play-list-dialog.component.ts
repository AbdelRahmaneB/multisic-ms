import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayList } from './play-list.model';
import { PlayListPopupService } from './play-list-popup.service';
import { PlayListService } from './play-list.service';
import { Track, TrackService } from '../track';

@Component({
    selector: 'jhi-play-list-dialog',
    templateUrl: './play-list-dialog.component.html'
})
export class PlayListDialogComponent implements OnInit {

    playList: PlayList;
    isSaving: boolean;

    tracks: Track[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private playListService: PlayListService,
        private trackService: TrackService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.trackService.query()
            .subscribe((res: HttpResponse<Track[]>) => { this.tracks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.playList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.playListService.update(this.playList));
        } else {
            this.subscribeToSaveResponse(
                this.playListService.create(this.playList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PlayList>>) {
        result.subscribe((res: HttpResponse<PlayList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PlayList) {
        this.eventManager.broadcast({ name: 'playListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTrackById(index: number, item: Track) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-play-list-popup',
    template: ''
})
export class PlayListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playListPopupService: PlayListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.playListPopupService
                    .open(PlayListDialogComponent as Component, params['id']);
            } else {
                this.playListPopupService
                    .open(PlayListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
