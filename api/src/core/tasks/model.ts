import { Schema, Document, Model, model, VirtualType } from 'mongoose';
import { pick } from 'lodash';

export interface ITask {
  _id: any;
  title: string;
  content: string;
  projectId: string;
  imageIds: [];
}

export interface ITaskDocument extends ITask, Document {
  toJSON(): any;
}

export interface ITaskModel extends Model<ITaskDocument> {
  id: any;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  imageIds: [],
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

TaskSchema.virtual('id').get(function(this: any): VirtualType {
  return this._id.toHexString();
});

TaskSchema.set('toObject', { virtuals: true });

TaskSchema.methods.toJSON = function() {
  return pick(this.toObject(), ['id', 'title', 'content', 'projectId']);
};

const Task = model<ITaskDocument, ITaskModel>('Task', TaskSchema);

export { Task };
