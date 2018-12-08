import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Pitch';

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
