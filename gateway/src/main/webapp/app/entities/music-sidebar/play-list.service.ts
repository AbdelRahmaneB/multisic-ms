import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PlayList } from './play-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PlayList>;

@Injectable()
export class PlayListService {
    private resourceUrl = SERVER_API_URL + 'music/api/play-lists';

    constructor(private http: HttpClient) {}

    create(playList: PlayList): Observable<EntityResponseType> {
        const copy = this.convert(playList);
        return this.http
            .post<PlayList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(playList: PlayList): Observable<EntityResponseType> {
        const copy = this.convert(playList);
        return this.http
            .put<PlayList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<PlayList>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PlayList[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<PlayList[]>(this.resourceUrl, {
                params: options,
                observe: 'response',
            })
            .map((res: HttpResponse<PlayList[]>) =>
                this.convertArrayResponse(res)
            );
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PlayList = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(
        res: HttpResponse<PlayList[]>
    ): HttpResponse<PlayList[]> {
        const jsonResponse: PlayList[] = res.body;
        const body: PlayList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to PlayList.
     */
    private convertItemFromServer(playList: PlayList): PlayList {
        const copy: PlayList = Object.assign({}, playList);
        return copy;
    }

    /**
     * Convert a PlayList to a JSON which can be sent to the server.
     */
    private convert(playList: PlayList): PlayList {
        const copy: PlayList = Object.assign({}, playList);
        return copy;
    }
}
