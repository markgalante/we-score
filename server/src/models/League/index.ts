import {Schema, model} from 'mongoose';

import type {LeagueSchema} from '../../types';

const leagueSchema = new Schema<LeagueSchema>({
  id: {type: String},
  name: {type: String, required: true},
  pointsDraw: {type: Number, default: 1, required: true},
  pointsLoss: {type: Number, default: 0, required: true},
  pointsWin: {type: Number, default: 3, required: true},
	matches: [{
		type: Schema.Types.ObjectId,
    ref: "Match"
	}],
  teams: [{
    type: Schema.Types.ObjectId,
    ref: "Team",
  }]
})

export const League = model('League', leagueSchema);
