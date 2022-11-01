"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewMatchesInLeague = exports.registerMatch = void 0;
const models_1 = require("../models");
const registerMatch = async (req, res) => {
    //Create Match with scores
    const homeTeam = await models_1.Team.findById(req.body.homeTeam);
    const awayTeam = await models_1.Team.findById(req.body.awayTeam);
    const league = await models_1.League.findById(req.body.league);
    try {
        const match = await models_1.Match.create({
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
const updateTeams = async (req, homeTeam, awayTeam, league) => {
    try {
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
const viewMatchesInLeague = async (req, res) => {
    try {
        const matches = await models_1.Match.find({
            league: req.params.leagueId,
        });
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
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to fetch matches from league",
            error,
        });
    }
};
exports.viewMatchesInLeague = viewMatchesInLeague;
//# sourceMappingURL=match.js.map