import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from "~/app/post/post.model";
import {Observable} from "rxjs";
import {map} from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public static readonly DOMAIN = 'http://192.168.0.103:3000';

    public static readonly STRIP_URL = `${PostService.DOMAIN}/post/strip`;


    // #############################################

    constructor(private http: HttpClient) {}


    // #############################################

    public getStrip(): Observable<Post[]> {
        return this.http.get<Post[]>(PostService.STRIP_URL).pipe(
            map((response: any) => {
                const posts = response.map((post) => {
                    return new Post(post.id, post.name, post.photo, post.user);
                });

                return posts;
            })
        )
    }

    // #############################################
}
