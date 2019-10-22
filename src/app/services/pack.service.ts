import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { StoreHttpService } from './http/store.http-service';
import { OpenPackPopupComponent } from '../components/open-pack-popup/open-pack-popup.component';

@Injectable()
export class PackService {
    packs: any[];
    cmpRef: any;

    constructor(private store: StoreHttpService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef) {
    }

    async init() {
        this.packs = await this.store.getPacks();
    }

    openPack() {
        if (!this.packs || this.packs.length == 0) return;
        let id = this.packs.pop().id;
        this.openPackRevealModal(id);
    }

    private openPackRevealModal(id: string) {
        let factory = this.componentFactoryResolver.resolveComponentFactory(OpenPackPopupComponent);
        this.cmpRef = this.viewContainerRef.createComponent(factory);

        this.cmpRef.instance.packId = id;
        this.cmpRef.instance.packsLeft = this.packs.length;

        this.cmpRef.instance.openNext = () => {
            this.cmpRef.destroy();
            this.openPack();
        };

        this.cmpRef.instance.destroy = () => {
            this.cmpRef.destroy();
        };
    }

}