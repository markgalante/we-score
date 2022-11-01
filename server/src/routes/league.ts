import {Router} from 'express';
import {
  addLeague,
  viewLeagues,
} from '../controllers/league';

const router = Router();

router.post('/create-league', addLeague)
router.get('/leagues', viewLeagues)

export {
  router as leagueRouter
}