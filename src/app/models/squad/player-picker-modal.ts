import { Card } from '../card/card';
import { Observable } from 'rxjs';

export class PlayerPickerModal {
    callback: any;
    position: string;
    visible: boolean;
    cards: Observable<Card[]>;
}