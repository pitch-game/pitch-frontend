import { Component, OnInit } from '@angular/core';
import { Card } from 'pitch-player-card';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-active-squad',
  templateUrl: './active-squad.page.html',
  styleUrls: ['./active-squad.page.sass']
})
export class ActivesquadComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient) { }

  pendingChanges: boolean;

  squad: any;
  cards: any = {};
  popupCards: Card[];

  modal: any = {};

  visible: boolean;

  tickIcon = faCheckCircle;

  headers = {
    'Content-Type': 'application/json',
    'Authorization': this.authService.getAuthorizationHeaderValue()
  };

  ngOnInit() {
    this.http.get<any>(`${environment.apiEndpoint}/squad`, { headers: this.headers }).subscribe((squad) => {
      this.squad = squad

      for (let position in squad.lineup) {
        this.loadPosition(position);
      };
    });
  }

  //TODO aggregate in gateway
  loadPosition(position: string) {
    if(!this.squad.lineup[position]){
      //this.cards[position] = {};
      return;
    }

    this.http.get<any>(`${environment.apiEndpoint}/card/${this.squad.lineup[position]}`, { headers: this.headers }).subscribe((card) => {
      this.cards[position] = card;
    });
  }

  getPlayers(position: string) {
    this.http.get<Card[]>(`${environment.apiEndpoint}/card`, { headers: this.headers, params: new HttpParams().set('take', '11').set('position', position) }).subscribe((cards) => {
      this.popupCards = cards
    });
  }

  assign(position: string, cardId: string){
    this.squad.lineup[position] = cardId;
    this.loadPosition(position);
    this.pendingChanges = true;
  }

  pickPlayer(position: string) {
    this.modal.visible = true;
    this.modal.position = position;
    this.getPlayers(position);
  }

  save(){
    this.http.put<any>(`${environment.apiEndpoint}/squad`, this.squad, { headers: this.headers }).subscribe((squad) => {
      this.squad = squad

      for (let position in squad.lineup) {
        this.loadPosition(position);
      };

      this.pendingChanges = false;
    });
  }
}
