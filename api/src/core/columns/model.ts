import { pick } from 'lodash';
import { Document, Schema, Model, model } from 'mongoose';

export interface IColumn {
  id?: any;
  title: string;
  column: string;
  taskIds: string[];
  projectId: string;
}

export interface IColumnDocument extends IColumn, Document {
  toJSON(): any;
  taskIds: string[];
}

export interface IColumnModel extends Model<IColumnDocument> {
  id: any;
  taskIds: string[];
}

const ColumnSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  column: {
    type: String,
    required: true
  },
  taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

ColumnSchema.virtual('id').get(function(this: any) {
  return this._id.toHexString();
});

ColumnSchema.set('toObject', { virtuals: true });

ColumnSchema.methods.toJSON = function() {
  return pick(this.toObject(), [
    'id',
    'title',
    'column',
    'taskIds',
    'projectId'
  ]);
};

const Column = model<IColumnDocument, IColumnModel>('Column', ColumnSchema);

export { Column };
