import {
    Component,
    ChangeDetectorRef,
    ViewContainerRef
} from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { requestPermissions, takePicture } from 'nativescript-camera';
import { ImageSource } from 'tns-core-modules/image-source/image-source';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';

import { Post } from '~/app/post/post.model';
import { AddPostComponent } from '~/app/modals/add-post/add-post.component';
// import {TabComponent} from "~/app/navigation/tab/tab.component";

@Component({
    selector: 'ns-main-wrapper',
    templateUrl: './main-wrapper.component.html',
    styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent {
    public isSelected: string = 'profile';

    public newPostPhoto: string = null;

    constructor(
        private page: Page,
        private cd: ChangeDetectorRef,
        private modal: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.page.actionBarHidden = true;
        this.page.statusBarStyle = 'light';
        this.page.androidStatusBarBackground = '#ffffff';
    }

    // #############################################

    public onBottomSheetTap(isSelected: string): void {
        this.isSelected = isSelected;
        this.cd.detectChanges();
    }

    public onCreatePost() {
        //
        // const options: ModalDialogOptions = {
        //     context: {},
        //     viewContainerRef: this.viewContainerRef,
        //     fullscreen: true
        // };
        //
        // this.modal.showModal(AddPostComponent, options);
        requestPermissions().then(() => {
            takePicture().then((image) => {
                this.decodeToBase64(image);
            });
        });
    }

    private decodeToBase64(image) {
        ImageSource.fromAsset(image)
            .then((imageSource) => {
                const imageBase64 = imageSource.toBase64String('jpg', 60);
                const options: ModalDialogOptions = {
                    context: {image: imageBase64},
                    viewContainerRef: this.viewContainerRef,
                    fullscreen: true
                };
                this.newPostPhoto = imageBase64;

                this.modal.showModal(AddPostComponent, options).then((res) => {
                    if(res === 'success') {
                        this.isSelected = 'profile';
                    } else {
                        this.isSelected = 'home';
                    }
                });
            })
            .catch((err) => {
                this.isSelected = 'home';
            });
    }

    // selectTab(currentTab: TabComponent){
    //     this.tabs.toArray().map(tab => {
    //         tab.active = currentTab.type === tab.type;
    //
    //         return tab;
    //     });
    // }

    // #############################################
}
