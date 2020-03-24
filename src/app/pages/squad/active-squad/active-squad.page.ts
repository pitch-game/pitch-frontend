import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Squad } from 'src/app/models/squad/squad';
import { SquadStats } from 'src/app/models/squad/squad-stats';
import { PlayerPickerModal } from 'src/app/models/squad/player-picker-modal';
import { SquadStatsService } from 'src/app/services/squad-stats.service';
import { CardHttpService } from 'src/app/services/http/card.http-service';
import { SquadHttpService } from 'src/app/services/http/squad.http-service';
import { PitchPlayerCard } from 'pitch-player-card';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PlayerSelectorDialogComponent } from 'src/app/components/player-selector-dialog/player-selector-dialog.component';

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

    let dialogRef = this.dialog.open(PlayerSelectorDialogComponent, {
      data: {
        position: position,
        idsToFilter: this.idsToFilter(),
        callback: (async (cardId) => {
          this.squad.lineup[position] = cardId;
          if (cardId) {
            var card = await this.cardService.get(cardId);
            this.cards[position] = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity, card.fitness);
          } else {
            this.cards[position] = null;
          }

          this.pendingChanges = true;
          this.stats = this.squadStatsService.calculate(this.squad, this.cards);
          dialogRef.close();
        })
      },
      hasBackdrop: true
    });
  }

  async pickSub(index: number) {
    let dialogRef = this.dialog.open(PlayerSelectorDialogComponent, {
      data: {
        idsToFilter: this.idsToFilter(), callback: (async (cardId) => {
          this.squad.subs[index] = cardId;
          if (cardId) {
            var card = await this.cardService.get(cardId);
            this.cards[cardId] = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity, card.fitness);
          }
          this.pendingChanges = true;
          this.stats = this.squadStatsService.calculate(this.squad, this.cards);
          dialogRef.close();
        })
      },
      hasBackdrop: true
    });
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

  private async getCardsForLineup() {
    var ids = Object.values(this.squad.lineup).filter(x => x);
    if (ids.length == 0) return;
    var cards = await this.cardService.getMany(ids);
    for (let position in this.squad.lineup) {
      var card = cards.find(x => x.id == this.squad.lineup[position]);
      if (card) {
        var ppc = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity, card.fitness);
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
        var ppc = new PitchPlayerCard(card.id, card.shortName, card.position, card.rating, card.rarity, card.fitness);
        this.cards[this.squad.subs[index]] = ppc;
      } else {
        this.cards[this.squad.subs[index]] = null;
      }
    };
  }
}
