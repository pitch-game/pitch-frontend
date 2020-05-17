export class Card {
    id: string;
    playerId: string;
    userId: string;
    name: string;
    shortName: string;
    position: string;
    rating: number;
    rarity: string;
    opened: boolean;
    form: number;
    fitness: number;
    previousOwners: number;
    gamesPlayed: number;
    goalsScored: number;
    createdOn: Date;
    
    redCards: number;
    yellowCards: number;
    goals: number;
}