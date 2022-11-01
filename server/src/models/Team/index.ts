import {model, Schema} from 'mongoose';

import type {
  TeamSchema,
} from '../../types';

const teamSchema = new Schema<TeamSchema>({
  name: {type: String, required: true},
  goalsAgainst: {type: Number, default: 0},
  goalsFor: {type: Number, default: 0},
  points: {type: Number, default: 0},
  home: {type: String, required: true},
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
  },
  matches: [{
    type: Schema.Types.ObjectId,
    ref: "Match"
  }],
});

export const Team = model("Team", teamSchema);
