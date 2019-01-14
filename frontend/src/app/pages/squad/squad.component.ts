import { Component, OnInit, AfterViewInit } from "@angular/core";
import anime from 'animejs';

@Component({
  selector: "app-squad",
  templateUrl: "./squad.component.html",
  styleUrls: ["./squad.component.less"]
})
export class SquadComponent implements OnInit, AfterViewInit {
  constructor() {}
  ngOnInit() {}

  spins = {};
  players = {};

  spin(name) {
    this.players[name] = { Name: "Mbappé", Rating: 84, Position: "ST" };
    if (this.spins[name] === "spin") {
      this.spins[name] = null;
    } else {
      this.spins[name] = "spin";
    }
  }

  ngAfterViewInit(): void {
    anime({
      targets: [".player"],
      rotateY: [{ value: 2520, duration: 4000 }],
      duration: 3000,
      loop: true,
      easing: 'easeOutCubic'
    }).add({ targets: '.player',  backgroundImage: 'none' }, 0);
  }

  onClick() {
  }
}
