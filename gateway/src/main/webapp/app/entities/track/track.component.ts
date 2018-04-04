import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Track } from './track.model';
import { TrackService } from './track.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-track',
    templateUrl: './track.component.html'
})
export class TrackComponent implements OnInit, OnDestroy {
tracks: Track[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trackService: TrackService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.trackService.query().subscribe(
            (res: HttpResponse<Track[]>) => {
                this.tracks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTracks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Track) {
        return item.id;
    }
    registerChangeInTracks() {
        this.eventSubscriber = this.eventManager.subscribe('trackListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
