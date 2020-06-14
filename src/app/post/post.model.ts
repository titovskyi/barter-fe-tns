export class Post {
    // #############################################

    constructor(
        public id: string,
        public title: string,
        public photo: string,
        public user: { id: string; name: string; avatar: string },
        public description: string
    ) {}

    // #############################################
}
