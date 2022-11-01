"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    goalsAgainst: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    home: { type: String, required: true },
    league: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "League",
        required: true,
    },
    matches: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Match"
        }],
});
exports.Team = (0, mongoose_1.model)("Team", teamSchema);
//# sourceMappingURL=index.js.map