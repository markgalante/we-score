import {
  Request,
  Response,
} from 'express';
import {
  League as LeagueModel,
} from '../models';

export const addTeam = async (
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