import {Injectable} from "@angular/core";

import { Post } from './post.model';

@Injectable({
    providedIn: 'root'
})
export class PostFactory {
    private static readonly SERVER_URL = 'http://192.168.0.103:3000/uploads/';

    // #############################################

    public getOne() {}

    public getAll(posts): Post[] {
        return posts.map((post) => {
            return this.create(post);
        });
    }

    // #############################################

    public create(postServerData): Post {
        const fullPostPhotoPath = PostFactory.SERVER_URL + postServerData.photo;
        const postData = {
            id: postServerData.id,
            title: postServerData.title,
            photo: fullPostPhotoPath,
            user: postServerData.user,
            description: postServerData.description || null
        }

        if(postData.user && postData.user.avatar) {
            postData.user.avatar = PostFactory.SERVER_URL + postData.user.avatar;
        }

        return new Post(postData.id, postData.title, postData.photo, postData.user, postData.description);
    }

    // #############################################
}
