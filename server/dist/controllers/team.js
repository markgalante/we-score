"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLeagueRankings = exports.createTeam = void 0;
const models_1 = require("../models");
const createTeam = async (req, res) => {
    try {
        const data = await models_1.Team.create({
            ...req.body,
            league: req.body.leagueId,
        });
        await addCreatedTeamToLeague(req, res, data);
        res
            .status(201)
            .send({
            message: "You have successfully created a team",
            data,
        });
    }
    catch (error) {
        res
            .status(422)
            .send({
            message: "Failure to create league",
            error,
        });
    }
};
exports.createTeam = createTeam;
const addCreatedTeamToLeague = async (req, res, data) => {
    try {
        await models_1.League
            .updateOne({
            _id: req.body.leagueId
        }, {
            $push: {
                teams: data
            }
        });
    }
    catch (error) {
        res
            .status(422)
            .send({
            message: "Failure to add team to the league",
            error,
        });
    }
};
const listLeagueRankings = async (req, res) => {
    try {
        const teams = await models_1.Team
            .find({
            league: req.params.leagueId
        }, '-__v')
            .sort({ points: -1, name: 1 });
        res.status(200).send({
            message: 'Successfully fetched league',
            data: teams,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to fetch teams",
            error,
        });
    }
};
exports.listLeagueRankings = listLeagueRankings;
//# sourceMappingURL=team.js.map