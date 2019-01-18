import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod'; //TODO


@Component({
  selector: "app-seasons",
  templateUrl: "./seasons.component.html",
  styleUrls: ["./seasons.component.less"]
})
export class SeasonsComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  response:any;

  ngOnInit() {
    let headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    this.http
      .get(`${environment.apiEndpoint}/api/test`, { headers: headers })
      .subscribe(response => (this.response = response));
  }
}
