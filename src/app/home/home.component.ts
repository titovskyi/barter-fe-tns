import { Component, OnInit } from '@angular/core';
import { PostService } from '~/app/post/post.service';
import { Post } from '~/app/post/post.model';

@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public stripPosts: Post[];

    // #############################################

    constructor(private postService: PostService) {}

    // #############################################

    ngOnInit(): void {
        this.postService.getStrip().subscribe((res: Post[]) => {
            this.stripPosts = res;
        });
    }

    // #############################################
}
