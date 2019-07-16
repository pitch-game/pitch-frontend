import { Card } from '../card/card';

export interface HomeResult {
    name: string;
    score: number;
    scorers: string[];
}

export interface AwayResult {
    name: string;
    score: number;
    scorers: string[];
}

export interface HomeStats {
    shots: number;
    shotsOnTarget: number;
    possession: number;
    fouls: number;
    yellowCards: number;
    redCards: number;
}

export interface AwayStats {
    shots: number;
    shotsOnTarget: number;
    possession: number;
    fouls: number;
    yellowCards: number;
    redCards: number;
}

export interface Event {
    minute: number;
    name: string;
    card: Card;
    squadName: string;
    cardId: string;
}

export interface Match {
    minute: number;
    homeResult: HomeResult;
    awayResult: AwayResult;
    homeStats: HomeStats;
    awayStats: AwayStats;
    events: Event[];
    expired: boolean;
    expiredOn: Date;
}

export interface MatchResult {
    match: Match;
    subsRemaining: number;
}
