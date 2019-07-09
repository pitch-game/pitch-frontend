import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { StoreHttpService } from '../store.service';
import { faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'src/app/models/card/card';
import { PitchPlayerCard } from 'pitch-player-card';
import { OpenPackPopupComponent } from 'src/app/components/open-pack-popup/open-pack-popup.component';

@Component({
  selector: 'app-ready-to-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.less']
})
export class ReadyToOpenComponent implements OnInit {
  cards: { [id: string]: Card } = {};
  packs: any[];

  constructor(private store: StoreHttpService, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  cmpRef: any;

  nextIcon = faChevronCircleRight;
  closeIcon = faTimes;

  ngOnInit() {
    this.store.getPacks().subscribe((packs) => {
      this.packs = packs;
    });
  }

  click() {
    let id = this.packs.pop().id;
    if (this.cards[id] && this.cards[id].opened) return;
    this.open(id);
  }

  open(id: string) {
    let factory = this.componentFactoryResolver.resolveComponentFactory(OpenPackPopupComponent);
    this.cmpRef = this.viewContainerRef.createComponent(factory);

    this.cmpRef.instance.packId = id;
    this.cmpRef.instance.packsLeft = this.packs.length;

    this.cmpRef.instance.openNext = () => {
      this.cmpRef.destroy();
      this.click();
    };

    this.cmpRef.instance.destroy = () => {
      this.cmpRef.destroy();
    };
  }
}
