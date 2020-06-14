import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from "~/app/post/post.model";
import {Observable} from "rxjs";
import {map} from "rxjs/internal/operators";
import {PostFactory} from "~/app/post/post.factory";
import {RequestOptionsInterface} from "~/app/post/request-options.interface";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public static readonly DOMAIN = 'http://192.168.0.103:3000';

    public static readonly POST_URL = `${PostService.DOMAIN}/post`;

    public static readonly STRIP_URL = `${PostService.DOMAIN}/post/strip`;


    // #############################################

    constructor(private http: HttpClient, private postFactory: PostFactory) {}


    // #############################################

    public getStrip(): Observable<Post[]> {
        return this.http.get<Post[]>(PostService.STRIP_URL).pipe(
            map((response: any) => {
                return this.postFactory.getAll(response);
            })
        )
    }

    public create(values: RequestOptionsInterface): Observable<Post> {
        return this.http.post<Post>(PostService.POST_URL, values);
    }

    // #############################################
}
