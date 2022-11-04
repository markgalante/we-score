"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewCustomLeagueData = exports.viewSpecificLeague = exports.viewLeagues = exports.addLeague = void 0;
const models_1 = require("../models");
const results_json_1 = __importDefault(require("../results.json"));
const addLeague = async (req, res) => {
    try {
        const data = await models_1.League.create({
            ...req.body,
        });
        res
            .status(201)
            .send({
            message: "You have successfully created a league",
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
exports.addLeague = addLeague;
const viewLeagues = async (_, res) => {
    try {
        const data = await models_1.League.find();
        res
            .status(200)
            .send({
            message: "Successfully fetched the collection of leagues",
            data,
        });
    }
    catch (error) {
        res
            .status(500)
            .send({
            message: "Something went wrong collecting the collection of leagues",
            error,
        });
    }
};
exports.viewLeagues = viewLeagues;
const viewSpecificLeague = async (req, res) => {
    try {
        const data = await models_1.League.findById(req.params.leagueID);
        res
            .status(200)
            .send({
            message: `Returned ${data?.name}`,
            data,
        });
    }
    catch (error) {
        res
            .status(500)
            .send({
            message: "Something went wrong collecting the collection of leagues",
            error,
        });
    }
};
exports.viewSpecificLeague = viewSpecificLeague;
const viewCustomLeagueData = (_, res) => {
    if (typeof results_json_1.default !== 'object') {
        res.status(422).send({
            message: 'Incorrect format',
            error: 'Incorrect formatting',
        });
    }
    ;
    const teams = {};
    (results_json_1.default ?? []).forEach(fixture => {
        if (!teams[fixture.homeTeam]) {
            teams[fixture.homeTeam] = 0;
        }
        if (!teams[fixture.awayTeam]) {
            teams[fixture.awayTeam] = 0;
        }
        if (fixture.homeScore > fixture.awayScore) {
            teams[fixture.homeTeam] += 3;
            teams[fixture.awayTeam] += 0;
        }
        if (fixture.homeScore < fixture.awayScore) {
            teams[fixture.awayTeam] += 3;
            teams[fixture.homeTeam] += 0;
        }
        if (fixture.homeScore === fixture.awayScore) {
            teams[fixture.awayTeam] += 1;
            teams[fixture.homeTeam] += 1;
        }
    });
    const teamList = Object.keys(teams);
    const pointsList = Object.values(teams);
    const leagueTable = [];
    teamList.forEach((team, index) => {
        leagueTable.push({
            team,
            points: pointsList[index]
        });
    });
    leagueTable.sort((a, b) => {
        if (a.points > b.points)
            return -1;
        if (a.points < b.points)
            return 1;
        if (a.points === b.points) {
            if (a.team > b.team)
                return 1;
            if (a.team < b.team)
                return -1;
        }
        return 1;
    });
    res.status(200).send({
        message: 'Success',
        data: leagueTable
    });
};
exports.viewCustomLeagueData = viewCustomLeagueData;
//# sourceMappingURL=league.js.map