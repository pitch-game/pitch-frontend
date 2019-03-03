import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Card } from 'src/app/components/player/player.component';

@Component({
  selector: "app-store",
  templateUrl: "./store.page.html",
  styleUrls: ["./store.page.less"]
})
export class StoreComponent implements OnInit {
  card: Card = { name: 'Ozil', rating: 78, position: 'ST', opened: true, rarity: 'gold' };

  constructor() {}
  ngOnInit() {
  }

  click(): void {

  }

  onClick() {
  }
}
