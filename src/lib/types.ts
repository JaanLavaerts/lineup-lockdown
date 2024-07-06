import * as ReactNbaLogos from 'react-nba-logos';

export interface Objective {
  id: string;
  description: string;
  target: number;
  stat: string;
  type: StatType;
  difficulty: Difficulty;
  suffix: string;
}

export interface Player {
  playerInfo: {
    personId: number;
    firstName: string;
    lastName: string;
    displayFirstLast: string;
    displayLastCommaFirst: string;
    displayFiLast: string;
    playerSlug: string;
    birthdate: string; // ISO 8601 date string
    school: string;
    country: string;
    lastAffiliation: string;
    height: string;
    weight: string;
    seasonExp: number;
    jersey: string;
    position: string;
    rosterStatus: string;
    gamesPlayedCurrentSeasonFlag: string;
    teamId: number;
    teamName: string;
    teamAbbreviation: string;
    teamCode: string;
    teamCity: string;
    playerCode: string;
    fromYear: number;
    toYear: number;
    dleagueFlag: string;
    nbaFlag: string;
    gamesPlayedFlag: string;
    draftYear: string;
    draftRound: string;
    draftNumber: string;
    greatest75Flag: string;
    teams: string[];
  };
  regularSeasonStats: Array<{
    playerId: number;
    leagueId: string;
    teamId: number;
    gp: number;
    gs: number;
    min: number;
    fgm: number;
    fga: number;
    fgPct: number;
    fg3m: number;
    fg3a: number;
    fg3Pct: number;
    ftm: number;
    fta: number;
    ftPct: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    tov: number;
    pf: number;
    pts: number;
  }>;
  postSeasonStats: Array<{
    playerId: number;
    leagueId: string;
    teamId: number;
    gp: number;
    gs: number;
    min: number;
    fgm: number;
    fga: number;
    fgPct: number;
    fg3m: number;
    fg3a: number;
    fg3Pct: number;
    ftm: number;
    fta: number;
    ftPct: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    tov: number;
    pf: number;
    pts: number;
  }>;
}

export interface PlayerSimpleInfo {
  id: number;
  fullName: string;
  teams: string[];
  positions: string[];
}

export interface Team {
  logo?: ReactNbaLogos.Icon;
  abbreviation?: string;
  name?: string;
}

export interface Lineup {
  pointGuard: PlayerSimpleInfo | null;
  shootingGuard: PlayerSimpleInfo | null;
  smallForward: PlayerSimpleInfo | null;
  powerForward: PlayerSimpleInfo | null;
  center: PlayerSimpleInfo | null;
}

export interface TeamStore extends Team {
  setTeam: (team: Team) => void;
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum StatType {
  TOT = 'TOT',
  AVG = 'AVG',
}
