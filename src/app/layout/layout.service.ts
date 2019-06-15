import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
    showNav: boolean;
    showMatchmaking: boolean;

    toggleNav() {
        this.showNav = !this.showNav;
    }
}