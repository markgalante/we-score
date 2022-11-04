import {Router} from 'express';
import {
  addLeague,
  viewLeagues,
  viewSpecificLeague,
  viewCustomLeagueData
} from '../controllers/league';

const router = Router();

router.post('/create-league', addLeague)
router.get('/leagues', viewLeagues)
router.get(`/leagues/:leagueID`, viewSpecificLeague)
router.get('/input-league', viewCustomLeagueData);;


export {
  router as leagueRouter
}