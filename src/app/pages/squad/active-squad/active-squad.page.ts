import { Component, OnInit } from '@angular/core';
import { Card } from 'pitch-player-card';

@Component({
  selector: 'app-active-squad',
  templateUrl: './active-squad.page.html',
  styleUrls: ['./active-squad.page.sass']
})
export class ActivesquadComponent implements OnInit {

  constructor() { }

  mbappe: Card = { name: 'Mbappe', position: 'ST', rating: 92, rarity: 'special'}
  ronaldo: Card = { name: 'Ronaldo', position: 'ST', rating: 98, rarity: 'special'}
  neymar: Card = { name: 'Neymar Jr', position: 'LM', rating: 92, rarity: 'super-rare'}
  milner: Card = { name: 'Milner', position: 'CM', rating: 80, rarity: 'gold'}
  henderson: Card = { name: 'Henderson', position: 'CM', rating: 80, rarity: 'gold'}
  salah: Card = { name: 'Salah', position: 'RM', rating: 88, rarity: 'super-rare'}
  robertson: Card = { name: 'Robertson', position: 'LB', rating: 80, rarity: 'gold'}
  vandijk: Card = { name: 'Van Dijk', position: 'CB', rating: 91, rarity: 'super-rare'}
  matip: Card = { name: 'Matip', position: 'CB', rating: 78, rarity: 'silver'}
  trent: Card = { name: 'Trent', position: 'RB', rating: 80, rarity: 'gold'}
  alisson: Card = { name: 'Alisson', position: 'GK', rating: 88, rarity: 'gold'}

  ngOnInit() {
  }

}
