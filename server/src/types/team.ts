import type {
  Types,
} from 'mongoose';
import {
  MatchSchema
} from './match';
import {
  LeagueSchema,
} from './league';

export type TeamSchema = {
  name: string;
  matches: MatchSchema[];
  league: LeagueSchema;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  home: string;
  _id: Types.ObjectId;
}