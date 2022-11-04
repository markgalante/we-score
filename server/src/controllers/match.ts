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

type LeagueDataType = (
  Document<
    unknown,
    any,
    ModelTypes.LeagueSchema
  > & ModelTypes.LeagueSchema & Required<{
    _id: Types.ObjectId;
  }>
) | null

export const registerMatch = async (
  req: Request,
  res: Response,
) => {
  console.log(req.body);
  console.log(req.body.body)
  const homeTeam = await TeamModel.findById(req.body.homeTeam);
  const awayTeam = await TeamModel.findById(req.body.awayTeam);
  const league = await LeagueModel.findById(req.body.league);
  try {
    const match = await MatchModel.create({
      ...req.body,
      homeTeam,
      awayTeam,
      league,
    });
    await addMatchToLeague(req, res, match);
    await updateTeams(req, homeTeam, awayTeam, league);
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

const updateTeams = async (
  req: Request,
  homeTeam: TeamDataType,
  awayTeam: TeamDataType,
  league: LeagueDataType,
) => {
  try {
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

export const viewMatchesInLeague = async (
  req: Request,
  res: Response,
) => {
  try {
    const matches = await MatchModel.find({
      league: req.params.leagueId,
    })
    const data = matches.map(match => ({
      home: {
        name: match.homeTeam.name,
        score: match.homeScore,
        id: match.homeTeam._id,
      },
      away: {
        name: match.awayTeam.name,
        score: match.awayScore,
        id: match.awayTeam._id
      }
    }));
    res.status(200).send({
      message: `Successfully fetched results from league ${req.params.leagueId}`,
      data,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch matches from league",
      error,
    })
  }
}