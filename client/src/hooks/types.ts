export type LeagueInfoType = {
  _id: string;
  name: string;
  pointsDraw: number;
  pointsLoss: number;
  pointsWin: 0;
  matchesIds: Array<string>;
  teamsIds: Array<string>;
}

export type TeamInfo = {
  name: string;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  home: string;
  _id: string;
}

export type PostResultArgs = {
  awayScore: number;
  homeScore: number;
  awayTeam: string;
  homeTeam: string;
  league: string;
}
