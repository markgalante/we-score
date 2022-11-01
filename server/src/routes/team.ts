import {Router} from 'express';

import {
  createTeam,
} from '../controllers'

const router = Router();

router.post('/create-team', createTeam);

export {
  router as teamRouter,
}