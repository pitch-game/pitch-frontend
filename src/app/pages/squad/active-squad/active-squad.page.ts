import { Component, OnInit } from '@angular/core';
import { Card } from 'pitch-player-card';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';

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

  headers: any;

  async ngOnInit() {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationHeaderValue()
    };
    
    this.squad = await this.http.get<any>(`${environment.apiEndpoint}/squad`, { headers: this.headers }).toPromise();
    var ids = Object.values(this.squad.lineup).filter(x => x).join(';');
    if(ids.length === 0){
      return;
    };
    var cards = await this.http.get<Card[]>(`${environment.apiEndpoint}/card/cards/${ids}`, { headers: this.headers }).toPromise();
    for (let position in this.squad.lineup) {
      var card = cards.find(x => x.id == this.squad.lineup[position]);
      card.name = card.shortName; //TODO
      this.cards[position] = card;
    };
  }

  //TODO aggregate in gateway
  async loadPosition(position: string) {
    if(!this.squad.lineup[position]){
      //this.cards[position] = {};
      return;
    }

    this.cards[position] = await this.http.get<Card[]>(`${environment.apiEndpoint}/card/${this.squad.lineup[position]}`, { headers: this.headers }).toPromise();

  }

  async getPlayers(position: string) {
    this.modal.popupCards = await this.http.get<Card[]>(`${environment.apiEndpoint}/card`, { headers: this.headers, params: new HttpParams().set('take', '11').set('position', position) });
  }

  async assign(position: string, cardId: string){
    this.squad.lineup[position] = cardId;
    await this.loadPosition(position);
    this.pendingChanges = true;
  }

  async pickPlayer(position: string) {
    this.modal.visible = true;
    this.modal.position = position;
    await this.getPlayers(position);
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
