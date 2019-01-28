import { Component, OnInit, Input } from '@angular/core';
import anime from 'animejs';

@Component({
    selector: "pitch-player",
    templateUrl: "player.component.html",
    styleUrls: ["player.component.less"]
})
export class PlayerComponent implements OnInit {

    @Input()
    name: string;
    @Input()
    position: string;
    @Input()
    rating: number;

    @Input()
    opened: boolean;

    ngOnInit(): void {
        
    }

    click(){
        anime.timeline({
            loop: false
          })
          .add({ targets: ['.bow-left'],  translateY: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 250 }], easing: 'linear' }, 0)
          .add({ targets: ['.bow-right'],  translateY: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 250 }], easing: 'linear' }, 0)
          .add({ targets: ['.ribbon-left'],  translateX: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 1000 }], easing: 'linear' }, 100)
          .add({ targets: ['.ribbon-right'],  translateX: [{ value: 250, duration: 500 }], opacity: [{ value: 0, duration: 1000 }], easing: 'linear' }, 100)
          .add({ targets: ['.ribbon-top'],  translateY: [{ value: -250, duration: 750 }], opacity: [{ value: 0, duration: 750 }], easing: 'linear' }, 200)
          .add({ targets: ['.ribbon-bottom'],  translateY: [{ value: 250, duration: 750 }], opacity: [{ value: 0, duration: 750 }], easing: 'linear' }, 200)
          .add({ targets: ['.ribbon'],  opacity: [{ value: 0, duration: 1 }], easing: 'linear' }, 1000)
          .add({ targets: ['.cover'],  opacity: [{ value: 0, duration: 3000 }], easing: 'linear' }, 1000)
          .add({ targets: ['.player'], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic'}, 500)
          .add({ targets: ['.position'],  opacity: [{ value: 100, duration: 1000 }] }, '+=150')
          .add({ targets: ['.rating'],  opacity: [{ value: 100, duration: 1000 }] }, '+=150')
          .add({ targets: ['.name'],  opacity: [{ value: 100, duration: 1000 }] }, '+=500');
    }
}