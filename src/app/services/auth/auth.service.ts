import { Injectable, EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //private manager = new UserManager(getClientSettings());
  public user: any = null;
  public isAuthenticated: boolean;

  public onAuthenticationCompleted: EventEmitter<any> = new EventEmitter();

  constructor(public oidcSecurityService: OidcSecurityService) {
    this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;
    });

    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.user = userData;
    });
  }

  isLoggedIn(): Observable<boolean> {
    return from(this.oidcSecurityService.getUserData()).pipe(map<any, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));
  }

  async getAuthorizationHeaderValue(): Promise<string> {
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

  // completeAuthentication(): Promise<void> {
  //   return this.manager.signinRedirectCallback().then(user => {
  //     this.user = user;
  //     this.onAuthenticationCompleted.emit();
  //   });
  // }
}

