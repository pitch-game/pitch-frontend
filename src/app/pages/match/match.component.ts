import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { faSpinner, faCircle, faFutbol } from '@fortawesome/free-solid-svg-icons';
import { timer, from, interval } from 'rxjs';
import { concatMap, map, filter, take, flatMap } from 'rxjs/operators';
import { Card } from 'src/app/models/card/card';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {

  match: any;
  sessionId: string;
  loadingIcon = faSpinner;
  goalIcon = faFutbol;
  constructor(private route: ActivatedRoute, public matchService: MatchService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sessionId = params.get("id")
      this.poll();
    })
  }

  poll() {
    this.matchService.startPolling(this.sessionId);
  }

  getModel(card: any) {
    return new PitchPlayerCard(card.id, card.name, card.position, card.rating, 'silver')
  }

}
