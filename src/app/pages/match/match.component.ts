import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { faSpinner, faCircle, faFutbol, faClock, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import { timer, from, interval } from 'rxjs';
import { concatMap, map, filter, take, flatMap } from 'rxjs/operators';
import { Card } from 'src/app/models/card/card';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchService } from 'src/app/services/match.service';
import { SubstitutionModalComponent } from 'src/app/components/substitution-modal/substitution-modal.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {

  loadingIcon = faSpinner;
  goalIcon = faFutbol;
  timelineIcon = faClock;
  statsIcon = faChartLine;
  lineupIcon = faUsers;

  match: any;
  sessionId: string; 
  cmpRef: any;
  
  constructor(private route: ActivatedRoute, public matchService: MatchService, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

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
    return new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity)
  }

  substitution() {
    let factory = this.componentFactoryResolver.resolveComponentFactory(SubstitutionModalComponent);
    this.cmpRef = this.viewContainerRef.createComponent(factory);

    this.cmpRef.instance.destroy = () => {
      this.cmpRef.destroy();
    };

    this.cmpRef.instance.matchId = this.sessionId;
  }
}
