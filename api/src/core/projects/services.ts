import { pick } from 'lodash';
import { Response } from 'express';
import { Column } from '../columns';
import { Project } from './model';
import { ObjectID } from 'mongodb';
import { IAuthedRequest } from '../types';

export async function addOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { name } = pick(req.body, ['name']);

  const newProject = new Project({
    name,
    creator: req.user.id,
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
  });

  try {
    const { id } = await newProject.save();

    const newColumns = ['To Do', 'In Progress', 'Review', 'Done'].map(
      (title, index) => {
        const column = `column-${index + 1}`;
        return new Column({
          title,
          column,
          taskIds: [],
          projectId: id
        });
      }
    );

    const columns = await Column.create(newColumns);
    !columns && res.status(404).send();

    const project = await Project.findOne({ _id: id });
    !project && res.status(404).send();

    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getAll(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  try {
    const projects = await Project.find({ creator: req.user.id });
    !projects && res.status(404).send();

    res.status(200).send(projects);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId } = req.params;

  !ObjectID.isValid(projectId) && res.status(404).send();

  try {
    const project = await Project.findOne({
      _id: projectId,
      creator: req.user.id
    });

    !project && res.status(404).send();

    res.status(200).send(project);
  } catch (error) {
    res.status(400).send();
  }
}

export async function updateOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const id = req.params.projectId;
  const body = pick(req.body, ['name', 'columnOrder']);

  !ObjectID.isValid(id) && res.status(404).send();

  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, creator: req.user.id },
      { $set: body },
      { new: true }
    );

    !project && res.status(404).send();

    res.status(200).send(project);
  } catch (error) {
    res.status(400).send();
  }
}

export async function deleteOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const { projectId } = req.params;

  !ObjectID.isValid(projectId) && res.status(404).send();

  try {
    await Project.findOneAndDelete({ _id: projectId, creator: req.user.id });
    await Column.deleteMany({ projectId });
    res.status(200).send({});
  } catch (error) {
    res.status(400).send();
  }
}
