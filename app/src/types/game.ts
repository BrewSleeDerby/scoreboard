import { Period } from "./period";
import { Skater } from "./skater";
import { Team } from "./team";

export type Game = {
    AwayScore: number;
    AwayTeam: Team;
    AwaySkaters: Skater[];
    HomeScore: number;
    HomeSkaters: Skater[];
    HomeTeam: Team;
    JamTime: number;
    OfficialReviewCount: number;
    PeriodCount: number;
    PeriodTime: number;
    Periods: Period[];
    Status: GameStatus;
    TimeoutCount: number;
}

export enum GameStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Intermission = "Intermission",
    UnofficialFinal = "UnofficialFinal",
    Final = "Final",
}