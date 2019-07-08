import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Squad } from 'src/app/models/squad/squad';
import { SquadStats } from 'src/app/models/squad/squad-stats';
import { PlayerPickerModal } from 'src/app/models/squad/player-picker-modal';
import { SquadStatsService } from 'src/app/services/squad-stats.service';
import { CardService, CardQueryModel } from 'src/app/services/card.service';
import { SquadService } from 'src/app/services/squad.service';
import { PitchPlayerCard } from 'pitch-player-card';

@Component({
  selector: 'app-active-squad',
  templateUrl: './active-squad.page.html',
  styleUrls: ['./active-squad.page.sass']
})
export class ActivesquadComponent implements OnInit {
  constructor(private cardService: CardService, private squadService: SquadService, private squadStatsService: SquadStatsService) { }

  squad: Squad;
  stats: SquadStats = SquadStats.empty;
  cards: { [position: string]: PitchPlayerCard } = {};

  modal: PlayerPickerModal;
  pendingChanges: boolean;

  tickIcon = faCheckCircle;
  closeIcon = faTimes;

  async ngOnInit() {
    this.squad = await this.squadService.get().toPromise();
    await this.getCardsForLineup();
    await this.getCardsForSubs();
    this.stats = this.squadStatsService.calculate(this.squad, this.cards);
  }

  async pickPlayer(position: string) {
    this.modal = new PlayerPickerModal();
    this.modal.position = position;
    this.modal.callback = (async (id) => {
      await this.assign(position, id)
    });
    this.modal.visible = true;
    await this.getPlayers(position);
  }

  setTeamInstruction(style: string, value: number) {
    this.squad.instructions[style] = value;
    this.pendingChanges = true;
  }

  async pickSub(index: number) {
    this.modal = new PlayerPickerModal();
    this.modal.visible = true;
    this.modal.callback = (async (id) => {
      this.squad.subs[index] = id;
      if (id) {
        this.cards[id] = await this.cardService.get(id).toPromise();
      }
      this.pendingChanges = true;
      this.stats = this.squadStatsService.calculate(this.squad, this.cards);
    });
    await this.getPlayers(null);
  }

  async save() {
    await this.squadService.put(this.squad).subscribe(async (squad) => {
      this.squad = squad

      await this.getCardsForLineup();
      await this.getCardsForSubs();

      this.pendingChanges = false;
    });
  }

  idsToFilter() {
    return Object.values(this.squad.lineup).concat(this.squad.subs);
  }

  onScroll() {
    console.log('scroll');
  }

  private async getCardsForLineup() {
    var ids = Object.values(this.squad.lineup).filter(x => x);
    if (ids.length == 0) return;
    var cards = await this.cardService.getMany(ids).toPromise();
    for (let position in this.squad.lineup) {
      var card = cards.find(x => x.id == this.squad.lineup[position]);
      if(card){
        var ppc = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
        this.cards[position] = ppc;
      } else {
        this.cards[position] = null;
      }
    };
  }

  private async getCardsForSubs() {
    var subIds = this.squad.subs.filter(x => x);
    if (subIds.length == 0) return;
    var subCards = await this.cardService.getMany(subIds).toPromise();
    for (let index in this.squad.subs) {
      var card = subCards.find(x => x.id == this.squad.subs[index]);
      if(card){
        var ppc = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
        this.cards[this.squad.subs[index]] = ppc;
      } else {
        this.cards[this.squad.subs[index]] = null;
      }
    };
  }

  private async loadPosition(position: string) {
    if (!this.squad.lineup[position]) {
      this.cards[position] = null;
      return;
    }

    this.cards[position] = await this.cardService.get(this.squad.lineup[position]).toPromise();
  }

  private async getPlayers(position: string) {
    this.modal.cards = await this.cardService.getWithQuery(new CardQueryModel(0, 10, position, this.idsToFilter()));
  }

  private async assign(position: string, cardId: string) {
    this.squad.lineup[position] = cardId;
    await this.loadPosition(position);
    this.pendingChanges = true;
    this.stats = this.squadStatsService.calculate(this.squad, this.cards);
  }
}
