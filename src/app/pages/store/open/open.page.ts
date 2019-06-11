import { Component, OnInit } from '@angular/core';
import { StoreHttpService } from '../store.service';
import { Card } from 'pitch-player-card';
import { faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ready-to-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.less']
})
export class ReadyToOpenComponent implements OnInit {
  cards: Card[] = [];
  //packs: Observable<any>;
  packs: any[];

  constructor(private store: StoreHttpService) {}

  showCurtain: boolean;
  curtainPackId: string;

  nextIcon = faChevronCircleRight;
  closeIcon = faTimes;
  
  async ngOnInit() {
    //this.packs = await this.store.getPacks();
    this.packs = [{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'},{id: '1'}]
  }

  async click(id: string) {
    if(this.showCurtain = true){
      this.dismissCurtain();
    }
    this.cards[id] = await this.store.openPack(id);
    this.openCurtain(id);
    if(this.cards[id] && this.cards[id].opened) return;
  }

  dismissCurtain() {
    this.showCurtain = false;
    this.curtainPackId = null;
  }

  openCurtain(id: string) {
    this.showCurtain = true;
    this.curtainPackId = id;
  }
}
