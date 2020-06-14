import { Post } from '~/app/post/post.model';

export class User {
    // #############################################

    constructor(
        public id: string,
        public phone: number,
        public name: string,
        public avatar: string,
        public country: string,
        public city: string,
        public about: string,
        public posts: Post[]
    ) {}

    // #############################################
}
