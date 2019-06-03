import { Pipe, PipeTransform } from '@angular/core';
import { Card } from 'pitch-player-card';

@Pipe({ name: 'playerAlreadyInSquad' })
export class PlayerAlreadyInSquadPipe implements PipeTransform {
  transform(cards: Card[], cardIds: string[]) {
    if(!cards) return [];
    return cards.filter(card => cardIds.indexOf(card.id) == -1);
  }
}