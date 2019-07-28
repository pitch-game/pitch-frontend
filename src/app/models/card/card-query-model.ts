export class CardQueryModel {
    constructor(public skip: number = 0, public take: number = 10, public position: string = null, public notIn: string[] = null) { }
}