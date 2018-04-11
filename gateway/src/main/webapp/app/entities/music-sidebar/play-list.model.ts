import { BaseEntity } from './../../shared';
import { Track } from '../track/track.model';

export class PlayList implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public tracks?: Track[]
    ) {}
}
