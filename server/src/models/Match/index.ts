import {model, Schema} from 'mongoose';

import type {
  MatchSchema,
} from '../../types';

const matchSchema = new Schema<MatchSchema>({
  awayScore: {type: Number, required: true, default: 0},
  homeScore: {type: Number, required: true, default: 0},
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
  }
});

export const Match = model("Match", matchSchema);
