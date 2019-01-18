import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    let isLoggedIn = this.authService.isLoggedIn();
    isLoggedIn.subscribe((loggedin) => {
      if (!loggedin) {
        return true;
      }
    });
    return isLoggedIn;
  }
}
