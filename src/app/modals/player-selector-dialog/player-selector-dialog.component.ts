import { Component, OnInit, Inject } from '@angular/core';
import { CardHttpService } from 'src/app/services/http/card.http-service';
import { CardQueryModel } from 'src/app/models/card/card-query-model';
import { PitchPlayerCard } from 'pitch-player-card/models/pitch-player-card';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card/card';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-player-selector-dialog',
  templateUrl: './player-selector-dialog.component.html',
  styleUrls: ['./player-selector-dialog.component.less']
})
export class PlayerSelectorDialogComponent implements OnInit {

  callback: Function;
  idsToFilter: Array<string>;
  cards: Observable<Card[]>;
  position: string;

  constructor(private cardService: CardHttpService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.callback = data.callback;
    this.idsToFilter = data.idsToFilter;
    this.position = data.position;
   }

  async ngOnInit() {
    await this.getPlayers();
  }

  private getPlayers() {
    this.cards = this.cardService.getWithQuery(new CardQueryModel(0, 10, this.position, this.idsToFilter));
  }
}
