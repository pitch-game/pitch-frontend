import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user/profile';

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private httpClient: HttpClient) {}

    async get(): Promise<UserProfile> {
        return await this.httpClient.get<UserProfile>(`${environment.apiEndpoint}/user`).toPromise();
    }
}