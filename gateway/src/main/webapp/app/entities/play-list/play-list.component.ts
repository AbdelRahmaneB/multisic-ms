import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayList } from './play-list.model';
import { PlayListService } from './play-list.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-play-list',
    templateUrl: './play-list.component.html'
})
export class PlayListComponent implements OnInit, OnDestroy {
playLists: PlayList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private playListService: PlayListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

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

    trackId(index: number, item: PlayList) {
        return item.id;
    }
    registerChangeInPlayLists() {
        this.eventSubscriber = this.eventManager.subscribe('playListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
