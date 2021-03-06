import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { getString, remove } from 'tns-core-modules/application-settings/application-settings';

import { UserService } from '~/app/models/user/user.service';
import { User } from '~/app/models/user/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    // #############################################

    constructor(private userService: UserService, private router: Router) {}

    // #############################################

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const userAuthToken = getString('myChangeAccessToken');

        if (userAuthToken) {
            return this.userService.checkToken().pipe(
                map((response) => {
                    if (response) {
                        return true;
                    } else {
                        this.router.navigate(['login']);
                        return false;
                    }
                }),
                catchError((err) => {
                    this.router.navigate(['login']);

                    return of(false);
                })
            );

            // return this.userService.checkToken().subscribe(
            //     (response: boolean) => {
            //         return of(response);
            //     },
            //     (err) => {
            //         remove('myChangeAccessToken');
            //         this.router.navigate(['login']);
            //
            //         return of(false);
            //     }
            // );
        } else {
            this.router.navigate(['login']);

            return of(false);
        }
    }

    // #############################################
}
