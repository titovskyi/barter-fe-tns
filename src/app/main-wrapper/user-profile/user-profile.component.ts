import {ChangeDetectorRef, Component, NgZone, OnInit, ViewContainerRef} from '@angular/core';

import * as imagepicker from 'nativescript-imagepicker';
import { ImageAsset } from 'tns-core-modules/image-asset';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from '~/app/user/user.model';
import { UserService } from '~/app/user/user.service';
import { requestPermissions, takePicture } from 'nativescript-camera';
import { BottomSheetService, BottomSheetOptions } from 'nativescript-material-bottomsheet/angular';
import { BottomSheetComponent } from '~/app/shared/bottom-sheet/bottom-sheet.component';
import { flatMap } from 'rxjs/operators';
import {ImageSource} from "tns-core-modules/image-source";
import {RequestOptionsInterface} from "~/app/user/request-options.interface";

@Component({
    selector: 'ns-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    public isBottomSheetOpened: boolean = false;

    public user: User;

    public cameraImage: ImageAsset;

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

                this.decodeToBase64(this.cameraImage);
            });
    }

    private onTakePicture(): void {
        let options = {
            width: '100%',
            height: '300',
            keepAspectRatio: true,
            saveToGallery: false
        };
        requestPermissions().then(() => {0
            takePicture().then((image) => {
                this.cameraImage = image;

                this.decodeToBase64(this.cameraImage);
            });
        });
    }

    private decodeToBase64(image) {
        ImageSource
            .fromAsset(image)
            .then((imageSource) => {
                const imageBase64 = imageSource.toBase64String('jpg', 60);
                const values: RequestOptionsInterface = {
                    avatar: `data:image/jpeg;base64,${imageBase64}`,
                };

                this.userService.update(values).subscribe(() => {

                });


                this.userService.update(values).subscribe(() => {})
            })
            .catch((err) => console.log(err));
    }

    // #############################################
}
