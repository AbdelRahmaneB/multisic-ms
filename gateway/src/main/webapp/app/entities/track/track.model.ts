import { BaseEntity } from './../../shared';

export class Track implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public album?: string,
        public artist?: string,
        public imagesurl?: string,
        public previewurl?: string,
        public playlists?: BaseEntity[],
    ) {
    }
}
