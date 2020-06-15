import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Page } from 'tns-core-modules/ui/page';
import { setString, getString } from 'tns-core-modules/application-settings/application-settings';

import { UserService } from '../../models/user/user.service';

@Component({
    selector: 'ns-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
    public phone: string = null;

    public confirmCode: FormControl = new FormControl('');

    // #############################################

    constructor(
        private page: Page,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) {
        this.activatedRoute.paramMap.subscribe((response) => {
            this.phone = response.get('userPhone');
            this.confirmCode.setValue(response.get('userCode'));
        });
    }

    // #############################################

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = '#424855';
    }

    // #############################################

    public confirm(): void {
        this.userService.confirmUser(this.phone, this.confirmCode.value).subscribe((response) => {
            setString('myChangeAccessToken', response.token);
            this.router.navigate(['main']);
        });
    }

    // #############################################
}
