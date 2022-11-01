import {Router} from 'express';
import {
  addLeague,
  viewLeagues,
  viewSpecificLeague,
} from '../controllers/league';

const router = Router();

router.post('/create-league', addLeague)
router.get('/leagues', viewLeagues)
router.get(`/leagues/:leagueID`, viewSpecificLeague)

export {
  router as leagueRouter
}