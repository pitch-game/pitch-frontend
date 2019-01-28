import { Injectable, isDevMode } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    if(isDevMode()){
      return true;
    }
    let isLoggedIn = this.authService.isLoggedIn();
    isLoggedIn.subscribe((loggedin) => {
      if (!loggedin) {
        return true;
      }
    });
    return isLoggedIn;
  }
}
