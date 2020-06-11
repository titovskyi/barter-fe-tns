import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { getString } from 'tns-core-modules/application-settings/application-settings';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    // #############################################

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userAuthToken = getString('myChangeAccessToken');

        if (userAuthToken) {
            const authRequest = req.clone({
                setHeaders: {
                    authtoken: `${userAuthToken}`
                }
            });

            return next.handle(authRequest);
        }

        return next.handle(req);
    }

    // #############################################
}
