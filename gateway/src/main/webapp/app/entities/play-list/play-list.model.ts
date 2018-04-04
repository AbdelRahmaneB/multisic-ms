import { BaseEntity } from './../../shared';

export class PlayList implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public tracks?: BaseEntity[],
    ) {
    }
}
