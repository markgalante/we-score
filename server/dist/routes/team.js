"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.teamRouter = router;
router.post('/create-team', controllers_1.createTeam);
router.get('/rankings/:leagueId', controllers_1.listLeagueRankings);
//# sourceMappingURL=team.js.map