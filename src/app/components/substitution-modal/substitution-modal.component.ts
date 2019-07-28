import { Component, OnInit } from '@angular/core';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchHttpService } from 'src/app/services/http/match.http-service';

@Component({
  selector: 'app-substitution-modal',
  templateUrl: './substitution-modal.component.html',
  styleUrls: ['./substitution-modal.component.less']
})
export class SubstitutionModalComponent implements OnInit {

  rightChevron = faChevronRight;

  destroy: Function;
  callback: Function;

  off: PitchPlayerCard;
  on: PitchPlayerCard;

  matchId: string;

  squad: any;

  constructor(private matchHttpService: MatchHttpService) {
  }

  async ngOnInit() {
    this.squad = await this.matchHttpService.lineup(this.matchId);
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
    await this.matchHttpService.makeSub(this.off.id, this.on.id, this.matchId);
    this.callback();
    this.destroy();
  }
}
