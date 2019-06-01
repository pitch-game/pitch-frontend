
import { Card } from 'pitch-player-card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class StoreHttpService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    //todo split to http service
    async openPack(id: string) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': this.authService.getAuthorizationHeaderValue()
        };
        return await this.http.get<Card>(`${environment.apiEndpoint}/store/packs/open/` + id, { headers: headers });
    }
}