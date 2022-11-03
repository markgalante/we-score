export type TeamInfo = {
  name: string;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  home: string;
  _id: string;
}

export type LeagueTableData = Array<TeamInfo>