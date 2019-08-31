import express from 'express';
import { uploadProjectImage, uploadUserImage, getUserImage } from './services';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router
  .route('')
  .all(authenticate)
  .post(uploadUserImage)
  .get(getUserImage);

router.route('/:projectId/:taskId').post(uploadProjectImage);

export { router };
