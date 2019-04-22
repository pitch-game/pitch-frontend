import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { faFutbol, faEllipsisH, faStar, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-seasons",
  templateUrl: "./seasons.page.html",
  styleUrls: ["./seasons.page.less"]
})
export class SeasonsComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  response:any;

  findMatchIcon = faFutbol;
  simMatchIcon = faEllipsisH;
  starIcon = faStar;
  circleIcon = faCircle;

  ngOnInit() {
    // let headers = new HttpHeaders({
    //   Authorization: this.authService.getAuthorizationHeaderValue()
    // });

    // this.http
    //   .get(`${environment.apiEndpoint}/api/test`, { headers: headers })
    //   .subscribe(response => (this.response = response));
  }
}
