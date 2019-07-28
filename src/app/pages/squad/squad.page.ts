import { Component } from "@angular/core";
import { faUsers, faRunning, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-squad",
  templateUrl: "./squad.page.html",
  styleUrls: ["./squad.page.less"]
})

export class SquadComponent {
  squadIcon = faUsers;
  trainingIcon = faRunning;
  clubIcon = faUserTie;
}
