import { Component, OnInit, Input } from '@angular/core';
import { LineupDetail } from 'src/app/models/match/match-result';
import { Card } from 'src/app/models/card/card';

@Component({
  selector: 'app-match-lineup-squad',
  templateUrl: './match-lineup-squad.component.html',
  styleUrls: ['./match-lineup-squad.component.less']
})
export class MatchLineupSquadComponent implements OnInit {

  @Input()
  lineupDetail: LineupDetail;
  @Input()
  cardLookup: { [id: string]: Card; }

  constructor() { }

  ngOnInit(): void {
  }
}
