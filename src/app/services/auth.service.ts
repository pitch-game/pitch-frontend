import { Injectable, EventEmitter } from "@angular/core";
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from "oidc-client";
import { environment } from "src/environments/environment";
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User = null;
  public onAuthenticationCompleted: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `Bearer ${this.user.id_token}`;
    //return `${this.user.token_type} ${this.user.access_token}`;
  }

  async getToken() {
    let user = await this.manager.getUser();
    return user.id_token;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      this.onAuthenticationCompleted.emit();
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.identityEndpoint,
    client_id: "cbf24cc4a1bb79e441a5b5937be6dd84",
    redirect_uri: environment.appUri + "/auth-callback",
    post_logout_redirect_uri: environment.appUri,
    response_type: "id_token",
    scope: "openid",
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  };
}
