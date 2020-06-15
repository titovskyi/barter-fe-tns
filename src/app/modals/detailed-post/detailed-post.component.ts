import { Component, OnInit } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Post } from '~/app/models/post/post.model';
import { FormControl } from '@angular/forms';
import { PostService } from '~/app/models/post/post.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { UserService } from '~/app/models/user/user.service';

@Component({
    selector: 'ns-detailed-post',
    templateUrl: './detailed-post.component.html',
    styleUrls: ['./detailed-post.component.css']
})
export class DetailedPostComponent implements OnInit {
    public post: Post;

    public title: FormControl = new FormControl('');

    public description = new FormControl('');

    // #############################################

    constructor(
        private params: ModalDialogParams,
        private postService: PostService,
        private userService: UserService,
        private routerExtensions: RouterExtensions
    ) {}

    // #############################################

    ngOnInit(): void {
        this.post = this.params.context;
    }

    // #############################################

    public onConfirmTap(): void {
        const updatedPost = {
            title: this.title.value,
            description: this.description.value
        };

        this.postService.update(this.post.id, updatedPost).subscribe((response: Post) => {
            this.userService.updateUserPosts(response);
            this.params.closeCallback('success');
        });
    }

    public onClose(status: string): void {
        this.params.closeCallback(status);
    }

    // #############################################
}
