import {
  MatchSchema
} from './match';
import {
  TeamSchema,
} from './team';

export type LeagueSchema = {
  id: string;
  name: string;
  pointsWin: number;
  pointsDraw: number;
  pointsLoss: number;
  matches: MatchSchema[];
  teams: TeamSchema[];
}
