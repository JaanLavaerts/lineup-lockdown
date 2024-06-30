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

export interface Team {
  logo?: ReactNbaLogos.Icon;
  abbreviation?: string;
  name?: string;
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
