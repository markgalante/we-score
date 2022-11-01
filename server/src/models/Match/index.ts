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
    required: true,
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
    required: true,
  },
});

export const Match = model("Match", matchSchema);
