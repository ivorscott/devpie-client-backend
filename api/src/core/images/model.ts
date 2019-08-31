import { pick } from 'lodash/fp';
import { Document, Schema, VirtualType, Model, model } from 'mongoose';

export interface IImage {
  _id: any;
  imageData: any;
  imageName: any;
  userId: any;
  projectId: any;
}

export interface IImageDocument extends IImage, Document {}

export interface IImageModel extends Model<IImageDocument> {}

const ImageSchema: Schema = new Schema({
  imageName: {
    type: String,
    default: 'none',
    required: true
  },
  imageData: {
    type: String,
    required: true
  },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

ImageSchema.virtual('id').get(function(this: IImageDocument): VirtualType {
  return this._id.toHexString();
});

ImageSchema.set('toObject', { virtuals: true });

ImageSchema.methods.toJSON = function(): any {
  return pick(['id', 'imageName', 'imageData', 'userId', 'projectId'])(
    this.toObject()
  );
};

const Image = model<IImageDocument, IImageModel>('Image', ImageSchema);

export { Image };
