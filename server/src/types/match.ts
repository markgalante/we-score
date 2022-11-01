import {
  LeagueSchema,
} from './league';
import {
  TeamSchema
} from './team';

export type MatchSchema = {
  id: string;
  homeTeam: TeamSchema;
  awayTeam: TeamSchema;
  homeScore: number;
  awayScore: number;
  league: LeagueSchema
}