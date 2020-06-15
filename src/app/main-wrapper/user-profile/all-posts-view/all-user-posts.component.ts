import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Post } from '~/app/models/post/post.model';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DetailedPostComponent } from '~/app/modals/detailed-post/detailed-post.component';

@Component({
    selector: 'ns-all-user-posts',
    templateUrl: './all-user-posts.component.html',
    styleUrls: ['./all-user-posts.component.css']
})
export class AllUserPostsComponent implements OnInit {
    // #############################################

    @Input() public posts: Post[] = null;

    // #############################################

    constructor(private viewContainerRef: ViewContainerRef, private modal: ModalDialogService) {}

    // #############################################

    ngOnInit(): void {
        console.log(this.posts);
    }

    // #############################################

    public onPostTap(post: Post): void {
        const options: ModalDialogOptions = {
            context: post,
            viewContainerRef: this.viewContainerRef,
            fullscreen: true
        };

        this.modal.showModal(DetailedPostComponent, options).then(() => {});
    }

    // #############################################
}
