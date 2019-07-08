import { Component, OnInit } from '@angular/core';
import { StoreHttpService } from '../store.service';
import { faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'src/app/models/card/card';

@Component({
  selector: 'app-ready-to-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.less']
})
export class ReadyToOpenComponent implements OnInit {
  cards: {[id: string]: Card} = {};
  packs: any[];
  
  constructor(private store: StoreHttpService) {}

  showCurtain: boolean;
  curtainPackId: string;

  nextIcon = faChevronCircleRight;
  closeIcon = faTimes;
  
  ngOnInit() {
    this.store.getPacks().subscribe((packs) => {
      this.packs = packs;
    });
  }

  click() {
    let id = this.packs.pop().id;
    if(this.showCurtain){
      this.dismissCurtain();
    }
    this.store.openPack(id).subscribe((card) => {
      this.cards[id] = card;
    });
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
