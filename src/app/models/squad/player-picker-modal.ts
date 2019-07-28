import { Card } from '../card/card';
import { Observable } from 'rxjs';

export class PlayerPickerModal {
    callback: Function;
    position: string;
    visible: boolean;
    cards: Observable<Card[]>;
}