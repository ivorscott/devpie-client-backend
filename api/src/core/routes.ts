import express from 'express';
import { routeUsers } from './users';
import { routeUploads } from './images';
import { routeProjects } from './projects';

const router = express.Router();

router.use('/users', routeUsers);
router.use('/images', routeUploads);
router.use('/projects', routeProjects);

export default router;
