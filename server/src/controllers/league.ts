import {
  Request,
  Response,
} from 'express';
import {
  League as LeagueModel,
} from '../models';

import fixtures from '../results.json';

export const addLeague = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await LeagueModel.create({
      ...req.body,
    })
    res
      .status(201)
      .send({
        message: "You have successfully created a league",
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

export const viewLeagues = async (
  _: Request,
  res: Response,
) => {
  try {
    const data = await LeagueModel.find()
    res
      .status(200)
      .send({
        message: "Successfully fetched the collection of leagues",
        data,
      })
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Something went wrong collecting the collection of leagues",
        error,
      })
  }
}

export const viewSpecificLeague = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await LeagueModel.findById(req.params.leagueID);
    res
    .status(200)
    .send({
      message: `Returned ${data?.name}`,
      data,
    })
  } catch (error) {
    res
    .status(500)
    .send({
      message: "Something went wrong collecting the collection of leagues",
      error,
    })
  }
}

export const viewCustomLeagueData = (
  _: Request,
  res: Response
) => {
  if(typeof fixtures !== 'object'){
    res.status(422).send({
      message: 'Incorrect format',
      error: 'Incorrect formatting',
    });
  };
  const teams: Record<string, number> = {};
  (fixtures ?? []).forEach(fixture => {
    if(!teams[fixture.homeTeam]){
      teams[fixture.homeTeam] = 0;
    }
    if(!teams[fixture.awayTeam]){
      teams[fixture.awayTeam] = 0;
    }
    if(fixture.homeScore > fixture.awayScore){
      teams[fixture.homeTeam] += 3;
      teams[fixture.awayTeam] += 0;
    }
    if(fixture.homeScore < fixture.awayScore){
      teams[fixture.awayTeam] += 3;
      teams[fixture.homeTeam] += 0;
    }
    if(fixture.homeScore === fixture.awayScore){
      teams[fixture.awayTeam] += 1
      teams[fixture.homeTeam] += 1
    }
  })
  const teamList = Object.keys(teams);
  const pointsList = Object.values(teams);
  const leagueTable: Array<Record<any,any>> = [];
  teamList.forEach((team, index) => {
    leagueTable.push({
      team,
      points: pointsList[index]
    })
  })

  leagueTable.sort((a, b) => {
    if(a.points > b.points) return -1;
    if(a.points < b.points) return 1;
    if(a.points === b.points){
       if(a.team > b.team) return 1;
       if(a.team < b.team) return -1;
    }
    return 1;
  });
  res.status(200).send({
    message: 'Success',
    data: leagueTable
  })
}