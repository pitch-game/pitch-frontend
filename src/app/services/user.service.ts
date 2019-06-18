import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private httpClient: HttpClient) {

    }

    get(){
        return this.httpClient.get<any>(`${environment.apiEndpoint}/user`);
    }
}