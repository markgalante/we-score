import {Router} from 'express'

import {
  registerMatch,
  viewMatchesInLeague,
} from '../controllers'

const router = Router();

router.post('/register-match', registerMatch);
router.get('/matches/:leagueId', viewMatchesInLeague)

export {
  router as matchRouter,
}