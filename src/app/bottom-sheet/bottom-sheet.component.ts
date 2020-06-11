import { Component, OnInit } from '@angular/core';
import { BottomSheetParams } from 'nativescript-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core/ui/list-view';

@Component({
    selector: 'ns-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {
    options: string[];
    // #############################################

    constructor(private params: BottomSheetParams) {}

    // #############################################

    ngOnInit(): void {
        this.options = this.params.context;
    }

    // #############################################

    onTap({ index }: ItemEventData) {
        this.params.closeCallback(index);
    }
}
