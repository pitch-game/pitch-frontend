import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../../models/user/profile';

@Injectable({
    providedIn: "root"
})
export class UserHttpService {

    constructor(private httpClient: HttpClient) {}

    get(): Promise<UserProfile> {
        return this.httpClient.get<UserProfile>(`${environment.apiEndpoint}/user`).toPromise();
    }
}