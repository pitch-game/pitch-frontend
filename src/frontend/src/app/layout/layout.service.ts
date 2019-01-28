import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
    showNav: boolean;

    toggleNav() {
        this.showNav = !this.showNav;
    }
}