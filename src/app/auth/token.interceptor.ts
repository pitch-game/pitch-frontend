import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.getAuthorizationHeaderValue())
            .pipe(switchMap(authHeader => {
                request = request.clone({
                    setHeaders: {
                        Authorization: authHeader
                    }
                });
                return next.handle(request)
            })
            );
    }
}