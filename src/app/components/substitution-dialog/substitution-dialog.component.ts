import { Component, OnInit, Inject } from '@angular/core';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchHttpService } from 'src/app/services/http/match.http-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-substitution-dialog',
  templateUrl: './substitution-dialog.component.html',
  styleUrls: ['./substitution-dialog.component.less']
})
export class SubstitutionDialogComponent implements OnInit {

  rightChevron = faChevronRight;

  destroy: Function;
  callback: Function;

  off: PitchPlayerCard;
  on: PitchPlayerCard;

  matchId: string;

  squad: any;

  constructor(private matchHttpService: MatchHttpService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.matchId = data.matchId;
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
