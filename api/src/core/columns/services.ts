import { pick } from 'lodash';
import { Request, Response } from 'express';
import { Column } from './model';
import { Project } from '../projects';
import { ObjectID } from 'mongodb';

export async function addOne(req: Request, res: Response): Promise<void> {
  const { projectId } = req.params;

  !ObjectID.isValid(projectId) && res.status(404).send();

  const { title, column } = pick(req.body, ['title', 'column']);
  const newColumn: any = new Column({ title, column, projectId, taskIds: [] });

  try {
    const column = await newColumn.save();

    !column && res.status(404).send();

    res.status(200).send(column);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getOne(req: Request, res: Response): Promise<void> {
  const { projectId, columnId } = req.params;

  !(ObjectID.isValid(projectId) && ObjectID.isValid(columnId)) &&
    res.status(404).send();

  try {
    const column = await Column.findOne({ projectId, _id: columnId });

    !column && res.status(404).send();

    res.status(200).send(column);
  } catch (error) {
    res.status(400).send();
  }
}

export async function getAll(req: Request, res: Response): Promise<void> {
  const { projectId } = req.params;

  !ObjectID.isValid(projectId) && res.status(404).send();

  try {
    const columns = await Column.find({ projectId });

    !columns && res.status(404).send();

    res.status(200).send(columns);
  } catch (error) {
    res.status(400).send();
  }
}

export async function updateOne(req: Request, res: Response): Promise<void> {
  const { columnId, projectId } = req.params;
  const body = pick(req.body, ['title', 'taskIds']);

  !(ObjectID.isValid(columnId) && ObjectID.isValid(projectId)) &&
    res.status(404).send();

  try {
    const column = await Column.findOneAndUpdate(
      { projectId, _id: columnId },
      { $set: body },
      { new: true }
    );

    !column && res.status(404).send();

    res.send(column);
  } catch (error) {
    res.status(400).send();
  }
}

export async function deleteOne(req: Request, res: Response): Promise<void> {
  const { columnId, projectId } = req.params;

  !(ObjectID.isValid(columnId) && ObjectID.isValid(projectId)) &&
    res.status(404).send();

  try {
    const column = await Column.findOne({ projectId, _id: columnId });
    !column && res.status(404).send();

    const taskIds = column && column.taskIds;

    const columnUpdate = await Column.findOneAndUpdate(
      { projectId, title: 'To Do' },
      { $push: { taskIds } },
      { new: true }
    );

    !columnUpdate && res.status(404).send();

    await Column.findOneAndDelete({ projectId, _id: columnId });

    await Project.findOneAndUpdate(projectId, {
      $pull: { columns: columnId }
    });

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
}
