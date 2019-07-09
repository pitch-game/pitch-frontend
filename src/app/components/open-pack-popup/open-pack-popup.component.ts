import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card/card';
import { StoreHttpService } from 'src/app/pages/store/store.service';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';

@Component({
  selector: 'app-open-pack-popup',
  templateUrl: './open-pack-popup.component.html',
  styleUrls: ['./open-pack-popup.component.less']
})
export class OpenPackPopupComponent implements OnInit {

  constructor(private store: StoreHttpService) { }

  card: PitchPlayerCard = null;
  packId: string;
  packsLeft: number;

  closeIcon = faTimes;
  nextIcon = faChevronRight;

  destroy: Function;
  openNext: Function;

  ngOnInit() {
    this.store.openPack(this.packId).subscribe((card) => {
      this.card = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
    });
  }

  click() {
    this.openNext();
  }
}
