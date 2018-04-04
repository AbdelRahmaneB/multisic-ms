/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { TrackComponent } from '../../../../../../main/webapp/app/entities/track/track.component';
import { TrackService } from '../../../../../../main/webapp/app/entities/track/track.service';
import { Track } from '../../../../../../main/webapp/app/entities/track/track.model';

describe('Component Tests', () => {

    describe('Track Management Component', () => {
        let comp: TrackComponent;
        let fixture: ComponentFixture<TrackComponent>;
        let service: TrackService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TrackComponent],
                providers: [
                    TrackService
                ]
            })
            .overrideTemplate(TrackComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrackComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrackService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Track(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tracks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
