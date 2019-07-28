import { Component, OnInit } from '@angular/core';
import { StoreHttpService } from 'src/app/services/http/store.http-service';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PitchPlayerCard } from 'pitch-player-card';

@Component({
  selector: 'app-open-pack-popup',
  templateUrl: './open-pack-popup.component.html',
  styleUrls: ['./open-pack-popup.component.less']
})
export class OpenPackPopupComponent implements OnInit {

  constructor(private storeHttpService: StoreHttpService) { }

  card: PitchPlayerCard = null;
  packId: string;
  packsLeft: number;

  closeIcon = faTimes;
  nextIcon = faChevronRight;

  destroy: Function;
  openNext: Function;

  async ngOnInit() {
    let result = await this.storeHttpService.openPack(this.packId);
    this.card = new PitchPlayerCard(result.id, result.shortName, result.position, result.rating, result.rarity)
  }

  click() {
    this.openNext();
  }
}
