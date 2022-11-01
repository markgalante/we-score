import {Router} from 'express'

import {
  registerMatch
} from '../controllers'

const router = Router();

router.post('/register-match', registerMatch);

export {
  router as matchRouter,
}