import { Component, OnInit, AfterViewInit } from "@angular/core";
import { faUsers, faRunning, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-squad",
  templateUrl: "./squad.component.html",
  styleUrls: ["./squad.component.less"]
})

export class SquadComponent implements OnInit {
  squadIcon = faUsers;
  trainingIcon = faRunning;
  clubIcon = faUserTie;

  constructor() {}
  ngOnInit() {}
}
