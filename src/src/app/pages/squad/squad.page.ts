import { Component, OnInit, AfterViewInit } from "@angular/core";
import { faUsers, faRunning, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: "app-squad",
  templateUrl: "./squad.page.html",
  styleUrls: ["./squad.page.less"]
})

export class SquadComponent implements OnInit {
  squadIcon = faUsers;
  trainingIcon = faRunning;
  clubIcon = faUserTie;

  constructor() {}
  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
