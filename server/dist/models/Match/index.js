"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    awayScore: { type: Number, required: true, default: 0 },
    homeScore: { type: Number, required: true, default: 0 },
    awayTeam: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    homeTeam: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    league: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "League",
        required: true,
    },
});
exports.Match = (0, mongoose_1.model)("Match", matchSchema);
//# sourceMappingURL=index.js.map