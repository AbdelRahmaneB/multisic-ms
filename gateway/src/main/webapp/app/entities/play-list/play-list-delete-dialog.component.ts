import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlayList } from './play-list.model';
import { PlayListPopupService } from './play-list-popup.service';
import { PlayListService } from './play-list.service';

@Component({
    selector: 'jhi-play-list-delete-dialog',
    templateUrl: './play-list-delete-dialog.component.html'
})
export class PlayListDeleteDialogComponent {

    playList: PlayList;

    constructor(
        private playListService: PlayListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'playListListModification',
                content: 'Deleted an playList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-play-list-delete-popup',
    template: ''
})
export class PlayListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playListPopupService: PlayListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.playListPopupService
                .open(PlayListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
