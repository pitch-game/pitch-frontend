import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.less']
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService) { }

  signedIn: boolean;

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.signedIn = loggedIn;
    });
  }

  signIn(){
    this.authService.startAuthentication();
  }
}
