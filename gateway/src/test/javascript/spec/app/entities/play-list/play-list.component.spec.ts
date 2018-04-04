/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { PlayListComponent } from '../../../../../../main/webapp/app/entities/play-list/play-list.component';
import { PlayListService } from '../../../../../../main/webapp/app/entities/play-list/play-list.service';
import { PlayList } from '../../../../../../main/webapp/app/entities/play-list/play-list.model';

describe('Component Tests', () => {

    describe('PlayList Management Component', () => {
        let comp: PlayListComponent;
        let fixture: ComponentFixture<PlayListComponent>;
        let service: PlayListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PlayListComponent],
                providers: [
                    PlayListService
                ]
            })
            .overrideTemplate(PlayListComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PlayList(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.playLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
