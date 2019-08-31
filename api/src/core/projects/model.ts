import { pick } from 'lodash';
import { Document, Schema, Model, model } from 'mongoose';

export interface IProject {
  open: boolean;
  name: string;
  creator: string;
  columnOrder: string[];
}

export interface IProjectDocument extends IProject, Document {
  toJSON(): any;
}

export interface IProjectModel extends Model<IProjectDocument> {
  id: any;
}

const ProjectsSchema: Schema = new Schema({
  open: {
    type: Boolean,
    default: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  columnOrder: []
});

ProjectsSchema.virtual('id').get(function(this: any) {
  return this._id.toHexString();
});

ProjectsSchema.set('toObject', { virtuals: true });

ProjectsSchema.methods.toJSON = function() {
  return pick(this.toObject(), [
    'id',
    'open',
    'name',
    'creator',
    'columnOrder'
  ]);
};

const Project = model<IProjectDocument, IProjectModel>(
  'Project',
  ProjectsSchema
);

export { Project };
