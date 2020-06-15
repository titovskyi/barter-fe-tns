import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LikeService {
    public static readonly DOMAIN = 'http://192.168.43.118:3000';

    public static readonly LIKE_URL = `${LikeService.DOMAIN}/like`;

    // #############################################

    constructor(private http: HttpClient) {}

    // #############################################

    public setLike(postId: string): Observable<{postId: string, userId: string}> {
        return this.http.post<{postId: string, userId: string}>(`${LikeService.LIKE_URL}`, {postId});
    }

    public removeLike(postId: string): Observable<any> {
        return this.http.delete(`${LikeService.LIKE_URL}/${postId}`);
    }

    // #############################################
}
