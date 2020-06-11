import { Component, Input, OnInit } from '@angular/core';
import { Post } from '~/app/post/post.model';

@Component({
    selector: 'ns-all-user-posts',
    templateUrl: './all-user-posts.component.html',
    styleUrls: ['./all-user-posts.component.css']
})
export class AllUserPostsComponent implements OnInit {
    // #############################################

    @Input() public posts: Post[] = null;

    // #############################################

    constructor() {}

    // #############################################

    ngOnInit(): void {
    }

    // #############################################

    public onPostTap(post: Post): void {
    }

    // #############################################
}
