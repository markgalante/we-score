import type {
  Request,
  Response,
} from 'express';
import type {
  Document,
  Types,
} from 'mongoose';

import {
  League as LeagueModel,
  Match as MatchModel,
  Team as TeamModel,
} from '../models'

import * as ModelTypes from '../types';

/**
  homeTeam: Team, 
  homeScore: number, 
  awayTeam: Team, 
  awayScore: number, 
  league: League;
)
 */

type MatchDataType = 
  Document<
    unknown, any, ModelTypes.MatchSchema> & ModelTypes.MatchSchema & {
    _id: Types.ObjectId;
  }

type TeamDataType = 
  (
    Document<
      unknown,
      any,
      ModelTypes.TeamSchema
    > & ModelTypes.TeamSchema & Required<{
      _id: Types.ObjectId;
    }>
  ) | null



export const registerMatch = async (
  req: Request,
  res: Response,
) => {
  //Create Match with scores
  try {
    const match = await MatchModel.create({
      ...req.body
    });
    await addMatchToLeague(req, res, match);
    await updateTeams(req, match);
    res
    .status(201)
    .send({
      message: "You have successfully registered a match",
      data: match,
    })
  } catch (error) {
    res
    .status(422)
    .send({
      message: "Failure to register match",
      error,
    })
  }
}

const addMatchToLeague = async (
  req: Request,
  res: Response,
  data: MatchDataType,
) => {
  try {
    await LeagueModel
    .updateOne({
      _id: req.body.league
    }, {
      $push: {
        matches: data
      }
    });
  } catch (error) {
    res
    .status(422)
    .send({
      message: "Failure to add match to the league",
      error,
    })
  }
}

/**
  homeTeam: Team, 
  homeScore: number, 
  awayTeam: Team, 
  awayScore: number, 
  league: League;
)
 */

const updateTeams = async (
  req: Request,
  data: MatchDataType,
) => {
  try {
    const homeTeam = await TeamModel.findById(data.homeTeam._id);
    const awayTeam = await TeamModel.findById(data.awayTeam._id);
    const league = await LeagueModel.findById(data.league._id);
    const {
      pointsDraw,
      pointsLoss,
      pointsWin,
    } = league!;
  
    const {homeScore, awayScore} = req.body;
    if (homeScore > awayScore) {
      await updateTeamsStandings(
        homeTeam, awayTeam, homeScore, awayScore, pointsWin, pointsLoss
      );
    }
    if (homeScore < awayScore) {
      await updateTeamsStandings(
        homeTeam, awayTeam, homeScore, awayScore, pointsLoss, pointsWin,
      )
    }
    if (homeScore === awayScore) {
      await updateTeamsStandings(
        homeTeam, awayTeam, homeScore, awayScore, pointsDraw, pointsDraw
      )
    }
    console.debug('Successfully updated team standings')
  } catch (error) {
    console.error('Something went wrong updating team standings!');
  }
};

const updateTeamsStandings = async (
  homeTeam: TeamDataType,
  awayTeam: TeamDataType,
  homeScore: number,
  awayScore: number,
  homePoints: number,
  awayPoints: number,
) => {
  if(homeTeam){
    homeTeam.goalsFor += homeScore;
    homeTeam.goalsAgainst += awayScore;
    homeTeam.points += homePoints;
    await homeTeam.save();
  }
  if(awayTeam){
    awayTeam.goalsFor += awayScore;
    awayTeam.goalsAgainst += homeScore;
    awayTeam.points += awayPoints;
    await awayTeam.save();
  }
}