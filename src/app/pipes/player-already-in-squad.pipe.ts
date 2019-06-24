import { Pipe, PipeTransform } from '@angular/core';
import { PitchPlayerCard } from 'pitch-player-card';

@Pipe({ name: 'playerAlreadyInSquad' })
export class PlayerAlreadyInSquadPipe implements PipeTransform {
  transform(cards: PitchPlayerCard[], cardIds: string[]) {
    if(!cards) return [];
    return cards.filter(card => cardIds.indexOf(card.id) == -1);
  }
}