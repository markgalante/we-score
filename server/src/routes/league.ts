import {Router} from 'express';
import {addLeague} from '../controllers/league';

const router = Router();

router.post('/create-league', addLeague)
router.get('/leagues')

export {
  router as leagueRouter
}