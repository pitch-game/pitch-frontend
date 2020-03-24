import { Component, OnInit, Inject } from '@angular/core';
import { CardHttpService } from 'src/app/services/http/card.http-service';
import { CardQueryModel } from 'src/app/models/card/card-query-model';
import { PitchPlayerCard } from 'pitch-player-card';
import { Observable, Subject } from 'rxjs';
import { Card } from 'src/app/models/card/card';
import { MAT_DIALOG_DATA } from '@angular/material';
import { startWith, switchMap, scan } from 'rxjs/operators';

@Component({
  selector: 'app-player-selector-dialog',
  templateUrl: './player-selector-dialog.component.html',
  styleUrls: ['./player-selector-dialog.component.less']
})
export class PlayerSelectorDialogComponent implements OnInit {

  callback: Function;
  idsToFilter: Array<string>;

  position: string;

  cards$: Observable<Card[]>;
  loadMore$ = new Subject<number>();

  skip: number = 0;
  take: number = 10;

  constructor(private cardService: CardHttpService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.callback = data.callback;
    this.idsToFilter = data.idsToFilter;
    this.position = data.position;
  }

  async ngOnInit() {
    this.cards$ = this.loadMore$
      .pipe(
        startWith(this.skip),
        switchMap((skip) => this.getPlayers(skip)),
        scan((all, current) => {
          all = all.concat(current);
          return all;
        }, [])
      );
  }

  private getPlayers(skip: number): Observable<Card[]> {
    return this.cardService.getWithQuery(new CardQueryModel(this.skip, this.take, this.position, this.idsToFilter));
  }

  getPitchCard(card: Card){
    return new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity, card.fitness);
  }

  onScroll() {
    this.skip += this.take;
    this.loadMore$.next(this.skip);
  }
}
