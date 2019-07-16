import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner, faFutbol, faClock, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchService } from 'src/app/services/match.service';
import { SubstitutionModalComponent } from 'src/app/components/substitution-modal/substitution-modal.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.less']
})
export class MatchComponent implements OnInit {

  loadingIcon = faSpinner;
  goalIcon = faFutbol;
  timelineIcon = faClock;
  statsIcon = faChartLine;
  lineupIcon = faUsers;

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

  //TODO fix performance
  getModel(card: any) {
    if(!card) return new PitchPlayerCard();
    return new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity)
  }

  substitution() {
    if(this.matchService.subsRemaining === 0) return;
    
    let factory = this.componentFactoryResolver.resolveComponentFactory(SubstitutionModalComponent);
    this.cmpRef = this.viewContainerRef.createComponent(factory);

    this.cmpRef.instance.destroy = () => {
      this.cmpRef.destroy();
    };

    this.cmpRef.instance.callback = () => {
      //get match
    };

    this.cmpRef.instance.matchId = this.sessionId;
  }
}
