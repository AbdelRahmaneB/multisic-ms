import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Track } from '../track/track.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Track[]>;

@Injectable()
export class SearchMusicService {
    private resourceUrl = SERVER_API_URL + 'musicprovider/api/music-providers';
    private searchResourceUrl = SERVER_API_URL + this.resourceUrl + '/search';

    constructor(private http: HttpClient) {}

    queryProviders(req?: any): Promise<HttpResponse<string[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<string[]>(this.resourceUrl, {
                params: options,
                observe: 'response',
            })
            .toPromise();
    }

    query(req?: any): Observable<Track[]> {
        const options = createRequestOption(req);
        return this.http.get<Track[]>(this.searchResourceUrl, {
            params: options,
        });
    }

    private convertArrayResponse(res: HttpResponse<Track[]>): Track[] {
        const jsonResponse: Track[] = res.body;
        const body: Track[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return body;
    }

    /**
     * Convert a returned JSON object to Track.
     */
    private convertItemFromServer(track: Track): Track {
        const copy: Track = Object.assign({}, track);
        return copy;
    }
}
