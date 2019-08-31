import { pick } from 'lodash/fp';
import { Image } from './model';
import { Task } from '../tasks/model';

import { Response } from 'express';
import { IAuthedRequest } from '../types';

export async function uploadProjectImage(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  try {
    const { projectId, taskId } = req.params;

    const { imageName, imageData } = pick(['imageName', 'imageData'])(req.body);
    const newImage = new Image({ imageName, imageData, projectId });

    Task.findOneAndUpdate(
      { _id: taskId },
      {
        $push: { imageIds: newImage.id }
      },
      { new: true }
    );

    newImage.save().then(result => {
      res.status(200).json({
        success: true,
        document: result
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function uploadUserImage(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user.id;

    await Image.deleteOne({ userId });

    const { imageName, imageData } = pick(['imageName', 'imageData'])(req.body);

    const newImage = new Image({ imageName, imageData, userId });

    newImage.save().then(result => {
      res.status(200).json({
        success: true,
        document: result
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getUserImage(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user.id;
    const image = await Image.findOne({ userId });

    !image && res.status(200).send({});
    image && res.status(200).send(image);
  } catch (error) {
    res.status(400).send(error);
  }
}
