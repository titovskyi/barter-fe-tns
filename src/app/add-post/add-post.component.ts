import { Component, OnInit } from '@angular/core';

// import * as Camera from 'nativescript-camera';
// import * as App from 'tns-core-modules/application';

import * as application from 'tns-core-modules/application';

import { CreateViewEventData } from "tns-core-modules/ui/placeholder";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ImageAsset } from 'tns-core-modules/image-asset';
@Component({
  selector: 'ns-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

    public photo: string;

  constructor(
      private params: ModalDialogParams
  ) {}

  ngOnInit(): void {
      // this.photo = `data:image/jpeg;base64,${this.params.context}`;
  }

    onConfirmTap() {
      console.log('sss');
    }

    onClose(status: string) {
        this.params.closeCallback(status);
    }
}
