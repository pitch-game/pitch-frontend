import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, scan, startWith } from 'rxjs/operators';
import { Card } from 'src/app/models/card/card';
import { CardHttpService } from 'src/app/services/http/card.http-service';
import { PitchPlayerCard } from 'pitch-player-card';
import { CardQueryModel } from 'src/app/models/card/card-query-model';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.less']
})
export class ClubComponent implements OnInit {

  constructor(private cardService: CardHttpService) { }

  cards$: Observable<Card[]>;
  loadMore$ = new Subject<number>();

  skip: number = 0;
  take: number = 25;

  displayedColumns: string[] = ['card', 'goals', 'createdOn'];

  async ngOnInit() {
    this.cards$ = this.loadMore$
      .pipe(
        startWith(this.skip),
        switchMap((skip) => this.getCards(skip)),
        scan((all, current) => {
          all = all.concat(current);
          return all;
        }, [])
      );
  }

  getCards(skip: number) {
    return this.cardService.getWithQuery(new CardQueryModel(this.skip, this.take));
  }

  onScroll() {
    this.skip += this.take;
    this.loadMore$.next(this.skip);
  }

  getPitchCard(card: Card){
    return new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity, card.fitness);
  }
}
