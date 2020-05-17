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
    squadName: string;
    cardId: string;
}

export interface Match {
    minute: number;
    homeResult: HomeResult;
    awayResult: AwayResult;
    homeStats: HomeStats;
    awayStats: AwayStats;
    timeline: Event[];
    expired: boolean;
    expiredOn: Date;
    cardLookup: { [id: string]: Card; }
    lineup: Lineup;
}

export interface MatchResult {
    match: Match;
    subsRemaining: number;
}


export interface Lineup {
    home: LineupDetail;
    away: LineupDetail;
}

export interface LineupDetail {
    subs: string[];
    lineup: { [id: string]: string[]; };
}