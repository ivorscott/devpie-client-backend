import { Response } from 'express';
import { pick } from 'lodash';
import { ObjectID } from 'mongodb';
import { Column } from '../columns';
import { IAuthedRequest } from '../types';
import { Task } from './model';

export async function addOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId, columnId } = req.params;

  !(ObjectID.isValid(projectId) && ObjectID.isValid(columnId)) &&
    res.status(404).send();

  const { title, content } = pick(req.body, ['title', 'content']);
  const newTask = new Task({ title, content, projectId });

  try {
    const task = await newTask.save();
    const columnUpdate = await Column.findOneAndUpdate(
      { _id: columnId },
      {
        $push: { taskIds: task.id }
      },
      { new: true }
    );

    !columnUpdate ? res.status(404).send() : res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId, taskId } = req.params;

  !(ObjectID.isValid(projectId) && ObjectID.isValid(taskId)) &&
    res.status(404).send();

  try {
    const task = await Task.findOne({ projectId, _id: taskId });
    !task ? res.status(404).send() : res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getAll(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId } = req.params;

  !ObjectID.isValid(projectId) && res.status(404).send();

  try {
    const tasks = await Task.find({ projectId });
    !tasks ? res.status(404).send() : res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function updateOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId, taskId } = req.params;
  const body = pick(req.body, ['title', 'content']);

  !(ObjectID.isValid(taskId) && ObjectID.isValid(projectId)) &&
    res.status(404).send();

  try {
    const task = await Task.findOneAndUpdate(
      { projectId, _id: taskId },
      { $set: body },
      { new: true }
    );

    !task ? res.status(404).send() : res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function moveOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId, taskId } = req.params;
  const { to, from, taskIds } = pick(req.body, ['to', 'from', 'taskIds']);

  !(ObjectID.isValid(taskId) && ObjectID.isValid(projectId)) &&
    res.status(404).send();

  try {
    if (from === to) {
      const column = await Column.findOneAndUpdate(
        { projectId, _id: from },
        { taskIds },
        { new: true }
      );

      !column ? res.status(400).send() : res.send(column);
    } else {
      const columnFrom = await Column.findOneAndUpdate(
        { projectId, _id: from },
        { $pull: { taskIds: taskId } },
        { new: true }
      );

      !columnFrom && res.status(400).send();

      const columnTo = await Column.findOneAndUpdate(
        { projectId, _id: to },
        { taskIds },
        { new: true }
      );

      !columnTo ? res.status(404).send() : res.send(columnTo);
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { taskId, columnId, projectId } = req.params;

  !(
    ObjectID.isValid(taskId) &&
    ObjectID.isValid(columnId) &&
    ObjectID.isValid(projectId)
  ) && res.status(404).send();

  try {
    const column = await Column.updateOne(
      { projectId, _id: columnId },
      { $pull: { taskIds: taskId } },
      { new: true }
    );

    !column && res.status(400).send();

    await Task.findOneAndDelete({ _id: taskId });

    !res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
}
