import { Component, OnInit } from '@angular/core';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-substitution-modal',
  templateUrl: './substitution-modal.component.html',
  styleUrls: ['./substitution-modal.component.less']
})
export class SubstitutionModalComponent implements OnInit {

  rightChevron = faChevronRight;

  destroy: Function;

  off: PitchPlayerCard;
  on: PitchPlayerCard;

  matchId: string;

  squad: any;

  constructor(private matchService: MatchService) {
  }

  async ngOnInit() {
    this.squad = await this.matchService.lineup(this.matchId).toPromise();
  }

  selectOff(card: any){
    this.off = card;
  }

  selectOn(card: any){
    this.on = card;
  }

  card(card: any){
    return new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
  }

  async sub(){
    await this.matchService.makeSub(this.off.id, this.on.id).toPromise();
  }
}
