import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Track } from './track.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Track>;

@Injectable()
export class TrackService {

    private resourceUrl =  SERVER_API_URL + 'music/api/tracks';

    constructor(private http: HttpClient) { }

    create(track: Track): Observable<EntityResponseType> {
        const copy = this.convert(track);
        return this.http.post<Track>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(track: Track): Observable<EntityResponseType> {
        const copy = this.convert(track);
        return this.http.put<Track>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Track>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Track[]>> {
        const options = createRequestOption(req);
        return this.http.get<Track[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Track[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Track = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Track[]>): HttpResponse<Track[]> {
        const jsonResponse: Track[] = res.body;
        const body: Track[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Track.
     */
    private convertItemFromServer(track: Track): Track {
        const copy: Track = Object.assign({}, track);
        return copy;
    }

    /**
     * Convert a Track to a JSON which can be sent to the server.
     */
    private convert(track: Track): Track {
        const copy: Track = Object.assign({}, track);
        return copy;
    }
}
