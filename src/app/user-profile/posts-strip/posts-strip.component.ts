import { Component, Input, OnInit } from '@angular/core';
import { User } from '~/app/user/user.model';

@Component({
    selector: 'ns-posts-strip',
    templateUrl: './posts-strip.component.html',
    styleUrls: ['./posts-strip.component.css']
})
export class PostsStripComponent implements OnInit {
    // #############################################

    @Input() public user: User;

    // #############################################

    constructor() {}

    // #############################################

    ngOnInit(): void {
    }

    // #############################################
}
