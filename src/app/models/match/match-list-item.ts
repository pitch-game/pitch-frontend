export interface MatchListItem {
    id: string;
    result: string;
    claimed: boolean;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    kickOff: Date;
}