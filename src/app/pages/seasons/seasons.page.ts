import { Component, OnInit } from "@angular/core";
import { faListUl, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-seasons",
  templateUrl: "./seasons.page.html",
  styleUrls: ["./seasons.page.less"]
})
export class SeasonsComponent implements OnInit {

  listIcon = faListUl;
  cupIcon = faTrophy;

  ngOnInit(): void {
  }

}