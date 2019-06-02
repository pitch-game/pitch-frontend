import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Card } from 'pitch-player-card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.less']
})
export class ClubComponent implements OnInit {

  constructor(private http: HttpClient) { }

  cards: Observable<Card[]>;

  async ngOnInit() {
    this.cards = await this.http.get<Card[]>(`${environment.apiEndpoint}/card`);
  }
}
