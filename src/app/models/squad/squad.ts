export class Squad {
    id: string;
    name: string;
    userId: string;
    lineup: { [position: string]: string };
    subs: string[]; //TODO
    instructions: SquadInstructions;
    lastUpdated: Date;
}

export class SquadInstructions {
    core: number;
    attacking: number;
    defensive: number;
}