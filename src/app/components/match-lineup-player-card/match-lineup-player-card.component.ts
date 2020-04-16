import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card/card';
import { PitchPlayerCard } from 'pitch-player-card';
import { faFutbol, faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-match-lineup-player-card',
  templateUrl: './match-lineup-player-card.component.html',
  styleUrls: ['./match-lineup-player-card.component.less']
})
export class MatchLineupPlayerCardComponent implements OnInit {
  goalIcon = faFutbol;
  squareIcon = faSquare;
  
  @Input()
  card: Card;

  ppc: PitchPlayerCard;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.card) return;
    this.ppc = new PitchPlayerCard(this.card.id, this.card.shortName, this.card.position, this.card.rating, this.card.rarity, this.card.fitness)
  }
}
