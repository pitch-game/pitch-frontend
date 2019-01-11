import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.less']
})
export class SquadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  spins = {};
  players = {};

  spin(name) {
    this.players[name] = {Name: 'Mbappé', Rating: 84, Position: 'ST'};
    if (this.spins[name] === 'spin') {
      this.spins[name] = null;
    } else {
      this.spins[name] = 'spin';
    }
  };
}
