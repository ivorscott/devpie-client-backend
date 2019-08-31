import express from 'express';
import * as ctrlUsers from './services';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();
router.route('').post(ctrlUsers.addOne);
router.route('/activate').get(authenticate, ctrlUsers.activate);
router.route('/login').post(ctrlUsers.login);

router.route('/username').post(ctrlUsers.checkUsername);

router
  .route('/:id')
  .all(authenticate)
  .get(ctrlUsers.getOne)
  .patch(ctrlUsers.updateOne);

router.route('/:id/token').delete(authenticate, ctrlUsers.logout);

export { router };
