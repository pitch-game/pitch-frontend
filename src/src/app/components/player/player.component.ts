import { Component, OnInit, Input } from '@angular/core';
import anime from 'animejs';

var nextId = 0;
@Component({
    selector: "pitch-player",
    templateUrl: "player.component.html",
    styleUrls: ["player.component.less"]
})
export class PlayerComponent implements OnInit {

    @Input()
    card: Card;

    id = `pitch-player-${nextId++}`;

    ngOnInit(): void {
        
    }

    //todo prepend unique dom id
    click(){
        anime.timeline({
            loop: false
          })
          .add({ targets: [`#${this.id} .bow-left`],  translateY: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 250 }], easing: 'linear' }, 0)
          .add({ targets: [`#${this.id} .bow-right`],  translateY: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 250 }], easing: 'linear' }, 0)
          .add({ targets: [`#${this.id} .ribbon-left`],  translateX: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 1000 }], easing: 'linear' }, 100)
          .add({ targets: [`#${this.id} .ribbon-right`],  translateX: [{ value: 250, duration: 500 }], opacity: [{ value: 0, duration: 1000 }], easing: 'linear' }, 100)
          .add({ targets: [`#${this.id} .ribbon-top`],  translateY: [{ value: -250, duration: 750 }], opacity: [{ value: 0, duration: 750 }], easing: 'linear' }, 200)
          .add({ targets: [`#${this.id} .ribbon-bottom`],  translateY: [{ value: 250, duration: 750 }], opacity: [{ value: 0, duration: 750 }], easing: 'linear' }, 200)
          .add({ targets: [`#${this.id} .ribbon`],  opacity: [{ value: 0, duration: 1 }], easing: 'linear' }, 1000)
          .add({ targets: [`#${this.id} .cover`],  opacity: [{ value: 0, duration: 3000 }], easing: 'linear' }, 1000)
          .add({ targets: [`#${this.id} .player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic'}, 500)
          .add({ targets: [`#${this.id} .position`],  opacity: [{ value: 100, duration: 1000 }] }, '+=150')
          .add({ targets: [`#${this.id} .rating`],  opacity: [{ value: 100, duration: 1000 }] }, '+=150')
          .add({ targets: [`#${this.id} .name`],  opacity: [{ value: 100, duration: 1000 }] }, '+=500');
    }
}

export enum Rarity {
    Bronze,
    Silver,
    Gold,
    Special,
    SuperRare
}

export class Card {
    name: string;
    position: string;
    rating: number;
    rarity: string;
    opened: boolean;
}