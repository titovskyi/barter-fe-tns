import { ChangeDetectorRef, Component, NgZone, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { requestPermissions, takePicture } from 'nativescript-camera';
import * as imagepicker from 'nativescript-imagepicker';
import { BottomSheetService, BottomSheetOptions } from 'nativescript-material-bottomsheet/angular';
import { ImageCropper } from 'nativescript-imagecropper';

import { ImageAsset } from 'tns-core-modules/image-asset';
import { ImageSource, fromResource, fromNativeSource } from 'tns-core-modules/image-source';

import { User } from '~/app/models/user/user.model';
import { UserService } from '~/app/models/user/user.service';
import { BottomSheetComponent } from '~/app/shared/bottom-sheet/bottom-sheet.component';
import { RequestOptionsInterface } from '~/app/models/user/request-options.interface';

@Component({
    selector: 'ns-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    public isBottomSheetOpened: boolean = false;

    public user: User;

    public cameraImage: ImageAsset;

    public croppedImage = null;

    public scale: number = 1;

    public isSelected: string = 'all';

    // #############################################

    constructor(
        private zone: NgZone,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private cd: ChangeDetectorRef
    ) {}

    // #############################################

    ngOnInit(): void {
        this.userService
            .getByToken()
            .pipe(
                flatMap(() => {
                    return this.userService.user;
                })
            )
            .subscribe((user: User) => {
                this.user = user;
            });
    }

    // #############################################

    public onTabTap(select: string) {
        this.isSelected = select;
        this.cd.detectChanges();
    }

    public onEditTap() {
        this.router.navigate(['edit-user']);
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

    private getImageFromGallery(context): void {
        this.cameraImage = null;
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                this.cameraImage = selection[0];

                // this.cameraImage.getImageAsync(source => {
                //     if (source) {
                //         const imageSource = new Image
                //         const selectedImgSource = fromNativeSource(source);
                //         const imageCropper = new ImageCropper();
                //         imageCropper
                //             .show(selectedImgSource, { width: 500, height: 500 })
                //             .then(args => {
                //                 if (args.image !== null) {
                //                     // Use args.image
                //                 }
                //             })
                //             .catch(function(e) {
                //                 console.log(e);
                //             });
                //     }
                // });

                this.decodeToBase64(this.cameraImage);
            });
    }

    private onTakePicture(): void {
        // let options = {
        //     width: '100%',
        //     height: '300',
        //     keepAspectRatio: true,
        //     saveToGallery: false
        // };
        requestPermissions().then(() => {
            takePicture().then((image) => {
                // ImageSource.fromAsset(image).then((source) => {
                //     setTimeout(async () => {
                //         const imageCropper = new ImageCropper();
                //         imageCropper
                //             .show(source, { width: 300, height: 300 })
                //             .then((args) => {
                //                 if (args.image !== null) {
                //                     // this.croppedImage.imageSource = args.image;
                //                     // console.log(this.cropped    Image);
                //                 }
                //             })
                //             .catch(function (e) {
                //                 console.log(e);
                //             });
                //     }, 1000);
                // });

                this.cameraImage = image;

                this.decodeToBase64(this.cameraImage);
            });
        });
    }

    private decodeToBase64(image) {
        ImageSource.fromAsset(image)
            .then((imageSource) => {
                const imageBase64 = imageSource.toBase64String('jpg', 60);
                const values: RequestOptionsInterface = {
                    avatar: `data:image/jpeg;base64,${imageBase64}`
                };

                this.userService.update(values).subscribe(() => {});
            })
            .catch((err) => console.log(err));
    }

    // #############################################
}
