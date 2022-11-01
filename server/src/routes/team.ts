import {Router} from 'express';

import {
  createTeam,
  listLeagueRankings,
} from '../controllers'

const router = Router();

router.post('/create-team', createTeam);
router.get('/rankings/:leagueId', listLeagueRankings);

export {
  router as teamRouter,
}