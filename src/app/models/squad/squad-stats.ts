import { Squad } from './squad';

export class SquadStats {
    chemistry: number;
    fitness: number;
    rating: number;

    static get empty() {
        var squadStats = new SquadStats();
        squadStats.chemistry = 0;
        squadStats.fitness = 0;
        squadStats.rating = 0;
        return squadStats;
    }
}