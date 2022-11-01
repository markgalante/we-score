import {
  Request,
  Response,
} from 'express';
import {
  League as LeagueModel,
} from '../models';

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