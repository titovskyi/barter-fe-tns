import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '~/app/user/user.model';
import { map } from 'rxjs/internal/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '~/app/post/post.model';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';

import * as bghttp from 'nativescript-background-http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public static readonly DOMAIN = 'http://192.168.0.103:3000';

    public static readonly UPLOADS_URL = `${UserService.DOMAIN}/upload`;

    public static readonly USER_URL = `${UserService.DOMAIN}/user`;

    public static readonly CHECK_TOKEN_URL = `${UserService.DOMAIN}/user/check-token`;

    public static readonly LOGIN_URL = `${UserService.DOMAIN}/user/login`;

    // #############################################

    private session;

    // #############################################

    private $user = new BehaviorSubject<User>({
        id: null,
        phone: null,
        name: null,
        avatar: null,
        posts: []
    });

    // #############################################

    constructor(private http: HttpClient) {
        this.session = bghttp.session('image-upload');
    }

    // #############################################

    get user(): Observable<User> {
        return this.$user.asObservable();
    }

    // #############################################

    public getByToken(): Observable<void> {
        return this.http
            .get<{ id?: string; phone?: number; name?: string; avatar?: string; posts?: Post[] }>(UserService.USER_URL)
            .pipe(
                map((response: any) => {
                    this.updateUserSubject(response);
                })
            );
    }

    // #############################################

    public login(phone: string): Observable<number> {
        return this.http.post<number>(UserService.LOGIN_URL, { phone });
    }

    public confirmUser(phone: string, confirmCode: string) {
        return this.http.post<{ token: string }>(UserService.USER_URL, { phone, confirmCode });
    }

    public checkToken(): Observable<boolean> {
        return this.http.get<boolean>(UserService.CHECK_TOKEN_URL);
    }

    public update(values: { name?: string, avatar?: string }): Observable<void> {
        return this.http
            .put<{ id?: string; phone?: number; name?: string; avatar?: string; posts?: Post[] | null }>(
                UserService.USER_URL,
                values
            )
            .pipe(
                map((response) => {
                    this.updateUserSubject(response);
                })
            );
    }

    public uploadAvatar(cameraImage: ImageAsset) {

    }

    // public updateWithAvatar(data: {
    //     form?: {
    //         name: string;
    //         country: string;
    //         city: string;
    //         email: string;
    //         about: string;
    //     };
    //     image?: ImageAsset;
    // }) {
    //     const HttpUploadOptions = {
    //         headers: new HttpHeaders({ "Content-Type": "application/octet-stream" })
    //     }
    //
    //     const body = [];
    //
    //     if (data.form.name) {
    //         body.push({ name: 'name', value: data.form.name });
    //     }
    //
    //     if (data.form.country) {
    //         body.push({ name: 'country', value: data.form.country });
    //     }
    //
    //     if (data.form.city) {
    //         body.push({ name: 'city', value: data.form.city });
    //     }
    //
    //     if (data.form.email) {
    //         body.push({ name: 'email', value: data.form.email });
    //     }
    //
    //     if (data.form.about) {
    //         body.push({ name: 'about', value: data.form.about });
    //     }
    //
    //
    //
    //
    //     // return this.http.put(UserService.USER_URL, data, HttpUploadOptions);
    // }

    // #############################################

    private updateUserSubject(values: {
        id?: string;
        phone?: number;
        name?: string;
        avatar?: string;
        posts?: Post[] | null;
    }) {
        const user = { ...this.$user.value, ...values };

        this.$user.next(new User(user.id, user.phone, user.name, user.avatar, user.posts));
    }

    // #############################################
}
