import { Component, OnInit } from '@angular/core';

import { Page } from 'tns-core-modules/ui/page';
import { FormControl } from '@angular/forms';
import { UserService } from '~/app/models/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public phoneInput: FormControl = new FormControl('+380957838869');

    public some = 1;

    // #############################################

    constructor(private page: Page, private userService: UserService, private router: Router) {}

    // #############################################

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = '#424855';
    }

    // #############################################

    public login(): void {
        this.userService.login(this.phoneInput.value).subscribe((response: number) => {
            this.some = response;
            const userData = {
                phone: this.phoneInput.value,
                confirmCode: response
            };

            this.router.navigate(['confirm', { userPhone: this.phoneInput.value, userCode: response }]);
        });
    }

    // #############################################
}
