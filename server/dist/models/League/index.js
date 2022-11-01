"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.League = void 0;
const mongoose_1 = require("mongoose");
const leagueSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String, required: true },
    pointsDraw: { type: Number, default: 1, required: true },
    pointsLoss: { type: Number, default: 0, required: true },
    pointsWin: { type: Number, default: 3, required: true },
    matches: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Match"
        }],
    teams: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Team",
        }]
});
exports.League = (0, mongoose_1.model)('League', leagueSchema);
//# sourceMappingURL=index.js.map