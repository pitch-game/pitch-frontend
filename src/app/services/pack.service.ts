import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { StoreHttpService } from './http/store.http-service';
import { OpenPackPopupComponent } from '../components/open-pack-popup/open-pack-popup.component';

@Injectable()
export class PackService {
    public packs: any[];
    cmpRef: any;

    constructor(private store: StoreHttpService,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    async init() {
        this.packs = await this.store.getPacks();
    }

    openPack(containerRef: ViewContainerRef) {
        if (!this.packs || this.packs.length == 0) return;
        let id = this.packs.pop().id;
        this.openPackRevealModal(id, containerRef);
    }

    private openPackRevealModal(id: string, containerRef: ViewContainerRef) {
        let factory = this.componentFactoryResolver.resolveComponentFactory(OpenPackPopupComponent);
        this.cmpRef = containerRef.createComponent(factory);

        this.cmpRef.instance.packId = id;
        this.cmpRef.instance.packsLeft = this.packs.length;

        this.cmpRef.instance.openNext = () => {
            this.cmpRef.destroy();
            this.openPack(containerRef);
        };

        this.cmpRef.instance.destroy = () => {
            this.cmpRef.destroy();
        };
    }

}