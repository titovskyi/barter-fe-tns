import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { FormControl } from '@angular/forms';
import { PostService } from '~/app/models/post/post.service';
import { UserService } from '~/app/models/user/user.service';
import { Post } from '~/app/models/post/post.model';
import { PostFactory } from '~/app/models/post/post.factory';
@Component({
    selector: 'ns-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
    public photo: string;

    // #############################################

    public title: FormControl = new FormControl('');

    public description: FormControl = new FormControl('');

    // #############################################

    constructor(
        private params: ModalDialogParams,
        private postService: PostService,
        private userService: UserService,
        private postFactory: PostFactory
    ) {}

    // #############################################

    ngOnInit(): void {
        this.photo = `data:image/jpeg;base64,${this.params.context.image}`;
    }

    // #############################################

    public onConfirmTap(): void {
        const newPost = {
            title: this.title.value,
            description: this.description.value,
            photo: this.photo
        };

        this.postService.create(newPost).subscribe((post: Post) => {
            const newPost = this.postFactory.create(post);

            this.userService.addUserPosts(newPost);
            this.params.closeCallback('success');
        });
    }

    public onClose(status: string): void {
        this.params.closeCallback(status);
    }

    // #############################################
}
