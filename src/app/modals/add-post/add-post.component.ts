import { Component, OnInit } from '@angular/core';

import {flatMap, mergeMap} from 'rxjs/operators';

// import * as Camera from 'nativescript-camera';
// import * as App from 'tns-core-modules/application';

import * as application from 'tns-core-modules/application';

import { CreateViewEventData } from 'tns-core-modules/ui/placeholder';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '~/app/post/post.service';
import { UserService } from '~/app/user/user.service';
import { Post } from '~/app/post/post.model';
import {PostFactory} from "~/app/post/post.factory";
@Component({
    selector: 'ns-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
    public photo: string;

    // #############################################

    public postForm: FormGroup;

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

    onConfirmTap() {
        const newPost = {
            title: this.title.value,
            description: this.description.value,
            photo: this.photo
        };

        this.postService.create(newPost).subscribe((post: Post) => {
            const newPost = this.postFactory.create(post);

            this.userService.updateUserPosts(newPost);
            this.params.closeCallback('success');
        });

        console.log('sss');
    }

    onClose(status: string) {
        this.params.closeCallback(status);
    }

    // #############################################
}
