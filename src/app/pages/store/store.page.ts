import { Component } from "@angular/core";
import { faMoneyBillWave, faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-store",
  templateUrl: "./store.page.html",
  styleUrls: ["./store.page.less"]
})

export class StoreComponent {
  buyIcon = faMoneyBillWave;
  openIcon = faGift;
}
