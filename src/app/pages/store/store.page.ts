import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Card } from 'pitch-player-card/models/card';
import { HttpClient } from '@angular/common/http';
import { StoreHttpService } from './store.service';
import { faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-store",
  templateUrl: "./store.page.html",
  styleUrls: ["./store.page.less"]
})
export class StoreComponent implements OnInit {
  cards: Card[] = [];

  constructor(private store: StoreHttpService) {}

  showCurtain: boolean;
  curtainPackId: string;

  nextIcon = faChevronCircleRight;
  closeIcon = faTimes;
  
  ngOnInit() {
  }

  click(id: string): void {
    this.openCurtain(id);
    if(this.cards[id] && this.cards[id].opened) return;
    this.store.openPack(id).subscribe(card => {
      this.cards[id] = card;
    });
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
