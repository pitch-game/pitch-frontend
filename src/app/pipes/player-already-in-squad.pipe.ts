import { Pipe, PipeTransform } from '@angular/core';
import { Card } from 'pitch-player-card';

@Pipe({ name: 'playerAlreadyInSquad' })
export class PlayerAlreadyInSquadPipe implements PipeTransform {
  transform(cards: Card[], lineup: any) {
    if(!cards) return [];
    var values = Object.values(lineup);
    return cards.filter(card => values.indexOf(card.id) == -1);
  }
}