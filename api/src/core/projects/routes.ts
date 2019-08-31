import express from 'express';
import * as ctrlTasks from '../tasks/services';
import * as ctrlColumns from '../columns/services';
import * as ctrlProjects from './services';

import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router
  .route('')
  .all(authenticate)
  .get(ctrlProjects.getAll)
  .post(ctrlProjects.addOne);

router
  .route('/:projectId')
  .all(authenticate)
  .get(ctrlProjects.getOne)
  .patch(ctrlProjects.updateOne)
  .delete(ctrlProjects.deleteOne);

router
  .route('/:projectId/columns')
  .all(authenticate)
  .get(ctrlColumns.getAll)
  .post(ctrlColumns.addOne);

router
  .route('/:projectId/columns/:columnId')
  .all(authenticate)
  .get(ctrlColumns.getOne)
  .patch(ctrlColumns.updateOne)
  .delete(ctrlColumns.deleteOne);

router.route('/:projectId/tasks').get(authenticate, ctrlTasks.getAll);

router
  .route('/:projectId/tasks/:taskId')
  .patch(authenticate, ctrlTasks.moveOne);

router
  .route('/:projectId/columns/:columnId/tasks')
  .post(authenticate, ctrlTasks.addOne);

router
  .route('/:projectId/columns/:columnId/tasks/:taskId')
  .all(authenticate)
  .get(ctrlTasks.getOne)
  .patch(ctrlTasks.updateOne)
  .delete(ctrlTasks.deleteOne);

export { router };
