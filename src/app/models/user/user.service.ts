import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '~/app/models/user/user.model';
import { map } from 'rxjs/internal/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import * as bghttp from 'nativescript-background-http';
import { UserFactory } from '~/app/models/user/user.factory';
import { RequestOptionsInterface } from '~/app/models/user/request-options.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public static readonly DOMAIN = 'http://192.168.43.118:3000';

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
        country: null,
        city: null,
        about: null,
        posts: []
    });

    // #############################################

    constructor(private http: HttpClient, private userFactory: UserFactory) {
        this.session = bghttp.session('image-upload');
    }

    // #############################################

    get user(): Observable<User> {
        return this.$user.asObservable();
    }

    // #############################################

    public getByToken(): Observable<void> {
        return this.http.get<User>(UserService.USER_URL).pipe(
            map((response: any): void => {
                const currentUser = this.userFactory.create(response);

                this.$user.next(currentUser);
            })
        );
    }

    // #############################################

    public login(phone: string): Observable<number> {
        return this.http.post<number>(UserService.LOGIN_URL, { phone });
    }

    public confirmUser(phone: string, confirmCode: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(UserService.USER_URL, { phone, confirmCode });
    }

    public checkToken(): Observable<boolean> {
        return this.http.get<boolean>(UserService.CHECK_TOKEN_URL);
    }

    public update(values: RequestOptionsInterface): Observable<void> {
        return this.http.put<User>(UserService.USER_URL, values).pipe(
            map((response: User): void => {
                const updatedUser = this.userFactory.create(response);

                this.$user.next(updatedUser);
            })
        );
    }

    // #############################################

    public addUserPosts(post): void {
        const user = this.$user.value;

        user.posts.push(post);

        this.$user.next({...user});
    }

    public updateUserPosts(newPost): void {
        let user = this.$user.value;

        user.posts = user.posts.map((post) => {
            if (post.id === newPost.id) {
                return newPost;
            }

            return post;
        });

        this.$user.next(user);
    }

    // #############################################
}
