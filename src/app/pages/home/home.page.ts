import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.less']
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, private _formBuilder: FormBuilder) { }

  signedIn: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.signedIn = loggedIn;
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  signIn(){
    this.authService.startAuthentication();
  }
}
