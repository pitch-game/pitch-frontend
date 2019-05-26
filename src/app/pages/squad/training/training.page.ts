import { Component, OnInit } from '@angular/core';
import { Card } from 'pitch-player-card';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.less']
})
export class TrainingComponent implements OnInit {

  constructor() { }
  
  neymar: Card = { name: 'Neymar Jr', position: 'LM', rating: 92, rarity: 'super-rare'}
  milner: Card = { name: 'Milner', position: 'CM', rating: 80, rarity: 'gold'}

  ngOnInit() {
  }

}
