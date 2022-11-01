"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMatch = void 0;
const models_1 = require("../models");
const registerMatch = async (req, res) => {
    //Create Match with scores
    try {
        const match = await models_1.Match.create({
            ...req.body
        });
        await addMatchToLeague(req, res, match);
        await updateTeams(req, match);
        res
            .status(201)
            .send({
            message: "You have successfully registered a match",
            data: match,
        });
    }
    catch (error) {
        res
            .status(422)
            .send({
            message: "Failure to register match",
            error,
        });
    }
};
exports.registerMatch = registerMatch;
const addMatchToLeague = async (req, res, data) => {
    try {
        await models_1.League
            .updateOne({
            _id: req.body.league
        }, {
            $push: {
                matches: data
            }
        });
    }
    catch (error) {
        res
            .status(422)
            .send({
            message: "Failure to add match to the league",
            error,
        });
    }
};
/**
  homeTeam: Team,
  homeScore: number,
  awayTeam: Team,
  awayScore: number,
  league: League;
)
 */
const updateTeams = async (req, data) => {
    try {
        const homeTeam = await models_1.Team.findById(data.homeTeam._id);
        const awayTeam = await models_1.Team.findById(data.awayTeam._id);
        const league = await models_1.League.findById(data.league._id);
        const { pointsDraw, pointsLoss, pointsWin, } = league;
        const { homeScore, awayScore } = req.body;
        if (homeScore > awayScore) {
            await updateTeamsStandings(homeTeam, awayTeam, homeScore, awayScore, pointsWin, pointsLoss);
        }
        if (homeScore < awayScore) {
            await updateTeamsStandings(homeTeam, awayTeam, homeScore, awayScore, pointsLoss, pointsWin);
        }
        if (homeScore === awayScore) {
            await updateTeamsStandings(homeTeam, awayTeam, homeScore, awayScore, pointsDraw, pointsDraw);
        }
        console.debug('Successfully updated team standings');
    }
    catch (error) {
        console.error('Something went wrong updating team standings!');
    }
};
const updateTeamsStandings = async (homeTeam, awayTeam, homeScore, awayScore, homePoints, awayPoints) => {
    if (homeTeam) {
        homeTeam.goalsFor += homeScore;
        homeTeam.goalsAgainst += awayScore;
        homeTeam.points += homePoints;
        await homeTeam.save();
    }
    if (awayTeam) {
        awayTeam.goalsFor += awayScore;
        awayTeam.goalsAgainst += homeScore;
        awayTeam.points += awayPoints;
        await awayTeam.save();
    }
};
//# sourceMappingURL=match.js.map