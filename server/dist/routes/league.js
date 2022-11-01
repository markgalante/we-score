"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueRouter = void 0;
const express_1 = require("express");
const league_1 = require("../controllers/league");
const router = (0, express_1.Router)();
exports.leagueRouter = router;
router.post('/create-league', league_1.addLeague);
router.get('/leagues', league_1.viewLeagues);
//# sourceMappingURL=league.js.map