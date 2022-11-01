import {Router} from 'express';
import {addTeam} from '../controllers/league';

const router = Router();

router.post('/create-league', addTeam)

export {
  router as leagueRouter
}