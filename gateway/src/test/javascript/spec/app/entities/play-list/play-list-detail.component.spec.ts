/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { PlayListDetailComponent } from '../../../../../../main/webapp/app/entities/play-list/play-list-detail.component';
import { PlayListService } from '../../../../../../main/webapp/app/entities/play-list/play-list.service';
import { PlayList } from '../../../../../../main/webapp/app/entities/play-list/play-list.model';

describe('Component Tests', () => {

    describe('PlayList Management Detail Component', () => {
        let comp: PlayListDetailComponent;
        let fixture: ComponentFixture<PlayListDetailComponent>;
        let service: PlayListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PlayListDetailComponent],
                providers: [
                    PlayListService
                ]
            })
            .overrideTemplate(PlayListDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayListDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PlayList(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.playList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
