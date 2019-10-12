import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Squad } from 'src/app/models/squad/squad';
import { SquadStats } from 'src/app/models/squad/squad-stats';
import { PlayerPickerModal } from 'src/app/models/squad/player-picker-modal';
import { SquadStatsService } from 'src/app/services/squad-stats.service';
import { CardHttpService } from 'src/app/services/http/card.http-service';
import { SquadHttpService } from 'src/app/services/http/squad.http-service';
import { PitchPlayerCard } from 'pitch-player-card';
import { CardQueryModel } from 'src/app/models/card/card-query-model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PlayerSelectorDialogComponent } from 'src/app/modals/player-selector-dialog/player-selector-dialog.component';

@Component({
  selector: 'app-active-squad',
  templateUrl: './active-squad.page.html',
  styleUrls: ['./active-squad.page.sass']
})
export class ActivesquadComponent implements OnInit {
  constructor(private cardService: CardHttpService, private squadService: SquadHttpService, private squadStatsService: SquadStatsService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  squad: Squad;
  stats: SquadStats = SquadStats.empty;
  cards: { [position: string]: PitchPlayerCard } = {};

  modal: PlayerPickerModal;
  pendingChanges: boolean;

  tickIcon = faCheckCircle;
  closeIcon = faTimes;

  async ngOnInit() {
    this.squad = await this.squadService.get();
    await this.getCardsForLineup();
    await this.getCardsForSubs();
    this.stats = this.squadStatsService.calculate(this.squad, this.cards);
  }

  async pickPlayer(position: string) {
    this.modal = new PlayerPickerModal();
    this.modal.visible = true;
    this.modal.position = position;
    this.modal.callback = (async (cardId) => {
      this.squad.lineup[position] = cardId;
      if (cardId) {
        var card = await this.cardService.get(cardId);
        this.cards[position] = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
      } else {
        this.cards[position] = null;
      }

      this.pendingChanges = true;
      this.stats = this.squadStatsService.calculate(this.squad, this.cards);
    });
    await this.getPlayers(position);
  }

  async pickSub(index: number) {
    this.modal = new PlayerPickerModal();
    this.modal.visible = true;
    this.modal.callback = (async (cardId) => {
      this.squad.subs[index] = cardId;
      if (cardId) {
        var card = await this.cardService.get(cardId);
        this.cards[cardId] = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
      }
      this.pendingChanges = true;
      this.stats = this.squadStatsService.calculate(this.squad, this.cards);
    });
    await this.getPlayers(null);
  }

  async save() {
    let squad = await this.squadService.put(this.squad);
    this.snackBar.open('Squad updated', null, {
      duration: 3000
    });
    this.squad = squad

    await this.getCardsForLineup();
    await this.getCardsForSubs();

    this.pendingChanges = false;
  }

  idsToFilter() {
    return Object.values(this.squad.lineup).concat(this.squad.subs);
  }

  setTeamInstruction(style: string, value: number) {
    this.squad.instructions[style] = value;
    this.pendingChanges = true;
  }

  openDialog() {
    const dialogRef = this.dialog.open(PlayerSelectorDialogComponent);
  }

  private async getCardsForLineup() {
    var ids = Object.values(this.squad.lineup).filter(x => x);
    if (ids.length == 0) return;
    var cards = await this.cardService.getMany(ids);
    for (let position in this.squad.lineup) {
      var card = cards.find(x => x.id == this.squad.lineup[position]);
      if (card) {
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
    var subCards = await this.cardService.getMany(subIds);
    for (let index in this.squad.subs) {
      var card = subCards.find(x => x.id == this.squad.subs[index]);
      if (card) {
        var ppc = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity);
        this.cards[this.squad.subs[index]] = ppc;
      } else {
        this.cards[this.squad.subs[index]] = null;
      }
    };
  }

  private getPlayers(position: string) {
    this.modal.cards = this.cardService.getWithQuery(new CardQueryModel(0, 10, position, this.idsToFilter()));
  }
}
