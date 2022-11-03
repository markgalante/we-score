import type {
  Request,
  Response,
} from 'express';
import type {
  Document,
  Types,
} from 'mongoose'

import {
  Team as TeamModel,
  League as LeagueModel,
} from '../models';

import type {TeamSchema} from '../types';

type TeamDataType = 
  Document<
  unknown,
  any,
  TeamSchema
  > & TeamSchema & {
  _id: Types.ObjectId;
  }

export const createTeam = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await TeamModel.create({
      ...req.body,
      league: req.body.leagueId,
    });
    await addCreatedTeamToLeague(req, res, data)
    res
    .status(201)
    .send({
      message: "You have successfully created a team",
      data,
    })
  } catch (error) {
    res
    .status(422)
    .send({
      message: "Failure to create league",
      error,
    })
  }
}

const addCreatedTeamToLeague = async (
  req: Request,
  res: Response,
  data: TeamDataType,
) => {
  try {
    await LeagueModel
    .updateOne({
      _id: req.body.leagueId
    }, {
      $push: {
        teams: data
      }
    });
  } catch (error) {
    res
    .status(422)
    .send({
      message: "Failure to add team to the league",
      error,
    })
  }
}

export const listLeagueRankings = async (
  req: Request,
  res: Response,
) => {
  try {
    const teams = await TeamModel
    .find({
      league: req.params.leagueId
    }, '-__v')
    .sort({points: -1, name: 1})
    res.status(200).send({
      message: 'Successfully fetched league',
      data: teams,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch teams",
      error,
    })
  }
}