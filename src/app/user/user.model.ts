import { Post } from '~/app/post/post.model';

export class User {
    constructor(
        public id: string,
        public phone: number,
        public name: string,
        public avatar: string,
        public posts?: Post[]
    ) {
        this.avatar = `http://192.168.0.103:3000/uploads/${this.avatar}`;
        console.log(this.avatar);
        this.posts = this.posts.map((post) => {
            return new Post(post.id, post.name, post.photo, post.user)
        })

    }
}
