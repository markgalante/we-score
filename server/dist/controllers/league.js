"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeam = void 0;
const models_1 = require("../models");
const addTeam = async (req, res) => {
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
exports.addTeam = addTeam;
//# sourceMappingURL=league.js.map