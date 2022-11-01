"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSpecificLeague = exports.viewLeagues = exports.addLeague = void 0;
const models_1 = require("../models");
const addLeague = async (req, res) => {
    try {
        const data = await models_1.League.create({
            ...req.body,
        });
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
//# sourceMappingURL=league.js.map