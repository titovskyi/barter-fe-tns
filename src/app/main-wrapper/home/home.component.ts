import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostService } from '~/app/models/post/post.service';
import { Post } from '~/app/models/post/post.model';
import { UserService } from '~/app/models/user/user.service';
import { User } from '~/app/models/user/user.model';
import { LikeService } from '~/app/main-wrapper/home/like.service';

@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public stripPosts: Post[] = [];

    public currentUser: User = null;

    public currentPostId: string = null;

    // #############################################

    constructor(
        private postService: PostService,
        private userService: UserService,
        private likeService: LikeService,
        private cd: ChangeDetectorRef
    ) {}

    // #############################################

    ngOnInit(): void {
        this.postService.getStrip().subscribe((res: Post[]) => {
            this.stripPosts = res;
        });

        this.userService.user.subscribe((user) => {
            this.currentUser = user;
        });
    }

    // #############################################

    public onPostMark(postId: string) {
        this.currentPostId = postId;
    }

    public onPostUnMark() {
        this.currentPostId = null;
    }

    public onLikeTap(currentPost: Post): void {
        const likeExist = currentPost.likes.find((like) => like.userId === this.currentUser.id);

        if (likeExist) {
            this.likeService.removeLike(currentPost.id).subscribe(() => {
                this.stripPosts.forEach((post) => {
                    if (post.id === currentPost.id) {
                        post.likes = post.likes.filter((like) => like.userId !== this.currentUser.id);
                    }
                });
            });
        } else {
            this.likeService.setLike(currentPost.id).subscribe((response: { postId: string; userId: string }) => {
                this.stripPosts.forEach((post) => {
                    if (post.id === response.postId) {
                        post.likes.push(response);
                    }
                });
            });
        }
    }

    public onProposeTap(postId: string): void {
        console.log(postId);
    }

    public checkLiked(post: Post): boolean {
        let alreadyLiked: boolean;

        for (let i = 0; post.likes.length > i; i++) {
            if (post.likes[i].userId === this.currentUser.id) {
                alreadyLiked = true;
                break;
            }

            alreadyLiked = false;
        }

        // post.likes.forEach((like) => {
        //     alreadyLiked = like.userId === this.currentUser.id;
        // });

        return alreadyLiked;
    }

    public setLikeColor(post) {
        if (post.likes.length === 0) {
            return 'green';
        } else if (post.likes.length > 2) {
            return 'red';
        } else {
            return 'yellow';
        }
    }

    // #############################################
}
