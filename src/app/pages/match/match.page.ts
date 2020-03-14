import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner, faFutbol, faClock, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatchService } from 'src/app/services/match.service';
import { SubstitutionDialogComponent } from 'src/app/components/substitution-dialog/substitution-dialog.component';
import { MatDialog } from '@angular/material';

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
  
  constructor(private route: ActivatedRoute, public matchService: MatchService, private componentFactoryResolver: ComponentFactoryResolver, private dialog: MatDialog) { }

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
    
    let dialogRef = this.dialog.open(SubstitutionDialogComponent, {
      data: {
        matchId: this.sessionId
      },
      hasBackdrop: true
    });
  }
}
