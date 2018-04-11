import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PlayList } from './play-list.model';
import { PlayListService } from './play-list.service';

@Component({
    selector: 'jhi-play-list-detail',
    templateUrl: './play-list-detail.component.html',
})
export class PlayListDetailComponent implements OnInit, OnDestroy {
    playList: PlayList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private playListService: PlayListService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlayLists();
    }

    load(id) {
        this.playListService
            .find(id)
            .subscribe((playListResponse: HttpResponse<PlayList>) => {
                this.playList = playListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlayLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playListListModification',
            (response) => this.load(this.playList.id)
        );
    }
}
