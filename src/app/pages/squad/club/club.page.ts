import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Card } from 'pitch-player-card';
import { Observable, Subject } from 'rxjs';
import { switchMap, scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.less']
})
export class ClubComponent implements OnInit {

  constructor(private http: HttpClient) { }

  cards$: Observable<Card[]>;
  loadMore$ = new Subject<number>();

  skip: number = 0;
  take: number = 10;

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
    return this.http.get<Card[]>(`${environment.apiEndpoint}/card`, { params: new HttpParams().set('skip', skip.toString()).set('take', this.take.toString()) });
  }

  onScroll() {
    this.skip += this.take;
    this.loadMore$.next(this.skip);
  }
}
