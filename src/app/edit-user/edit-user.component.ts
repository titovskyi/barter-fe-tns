import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Page } from 'tns-core-modules/ui/page';
import { ImageAsset } from 'tns-core-modules/image-asset';
import * as imagepicker from 'nativescript-imagepicker';
import { RouterExtensions } from 'nativescript-angular/router';

import { UserService } from '~/app/models/user/user.service';
import { User } from '~/app/models/user/user.model';
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import { BottomSheetComponent } from '~/app/shared/bottom-sheet/bottom-sheet.component';
import { requestPermissions, takePicture } from 'nativescript-camera';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageSource } from 'tns-core-modules/image-source';
import { RequestOptionsInterface } from '../models/user/request-options.interface';

var bghttpModule = require('nativescript-background-http');
var session = bghttpModule.session('image-upload');

@Component({
    selector: 'ns-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    public user: User;

    public cameraImage: ImageAsset;

    public prevAvatar: string = null;

    // #############################################

    public profileForm: FormGroup;

    public name: FormControl = new FormControl('');

    public country: FormControl = new FormControl('');

    public city: FormControl = new FormControl('');

    public email: FormControl = new FormControl('');

    public about: FormControl = new FormControl('');

    // #############################################

    constructor(
        private userService: UserService,
        private page: Page,
        private containerRef: ViewContainerRef,
        private bottomSheet: BottomSheetService,
        private routerExtensions: RouterExtensions,
    ) {
        this.page.actionBarHidden = true;
    }

    // #############################################

    ngOnInit(): void {
        this.createForm();

        this.userService.user.subscribe((user) => {
            this.user = user;
            this.profileForm.setValue({
                name: this.user.name,
                country: null,
                city: null,
                email: null,
                about: null
            });
        });
    }

    // #############################################

    public onCloseTap() {
        this.routerExtensions.back();
    }

    public onConfirmTap() {
        const values: RequestOptionsInterface = {
            name: this.name.value,
            avatar: this.user.avatar,
            prevAvatar: this.prevAvatar
        };

        this.userService.update(values).subscribe((res) => {
            this.routerExtensions.back();
        });
    }

    public openBottomSheet() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: ['Камера', 'Галерея']
        };

        this.bottomSheet.show(BottomSheetComponent, options).subscribe((result) => {
            this.onSelectBottomSheet(result);
        });
    }

    public onSelectBottomSheet(buttonIndex: number): void {
        if (buttonIndex === 0) {
            this.onTakePicture();
        } else if (buttonIndex === 1) {
            let context = imagepicker.create({
                mode: 'single'
            });

            this.getImageFromGallery(context);
        }
    }

    // #############################################

    private getImageFromGallery(context): void {
        this.cameraImage = null;
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                this.cameraImage = selection[0];

                ImageSource
                    .fromAsset(this.cameraImage)
                    .then((imageSource) => {
                        const imageBase64 = imageSource.toBase64String('jpg', 60);

                        this.prevAvatar = this.user.avatar;
                        this.user.avatar = `data:image/jpeg;base64,${imageBase64}`;
                    })
                    .catch((err) => console.log(err));
            });
    }

    private onTakePicture(): void {
        requestPermissions().then(() => {
            takePicture().then((image) => {
                this.cameraImage = image;

                ImageSource
                    .fromAsset(this.cameraImage)
                    .then((imageSource) => {
                        const imageBase64 = imageSource.toBase64String('jpg', 60);

                        this.prevAvatar = this.user.avatar;
                        this.user.avatar = `data:image/jpeg;base64,${imageBase64}`;
                    })
                    .catch((err) => console.log(err));
            });
        });
    }

    // #############################################

    private createForm() {
        this.profileForm = new FormGroup({
            name: this.name,
            country: this.country,
            city: this.city,
            email: this.email,
            about: this.about
        });
    }

    // #############################################
}
