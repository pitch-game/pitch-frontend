import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {

  match: any;
  sessionId : string;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sessionId = params.get("id")
    })
    this.httpClient.get(`${environment.apiEndpoint}/match/${this.sessionId}`).subscribe((result) => {
      this.match = result;
    });
  }

}
