import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(public oidcSecurityService: OidcSecurityService) { }

  isLoggedIn(): Observable<boolean> {
    return this.oidcSecurityService.getIsAuthorized();
  }

  getUserData(): Observable<any> {
    return this.oidcSecurityService.getUserData();
  }

  getAuthorizationHeaderValue(): string {
    return `Bearer ${this.getToken()}`;
  }

  getToken() {
    return this.oidcSecurityService.getIdToken();
  }

  signOut() {
    this.oidcSecurityService.logoff();
  }

  startAuthentication(): void {
    this.oidcSecurityService.authorize();
  }
}

