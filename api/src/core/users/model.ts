import { pick } from 'lodash';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Document, Schema, Model, model, VirtualType } from 'mongoose';
import validator from 'validator';
import firebaseAdmin from '../../integrations/firebase-admin';

export interface IUser {
  _id: any;
  role: string;
  email: string;
  title: string;
  company: string;
  username: string;
  lastName: string;
  password: string;
  firstName: string;
  activated: boolean;
  birthYear: string;
  tokens: {
    access: string;
    token: string;
    push(value: any): any;
  };
}

export interface IUserDocument extends IUser, Document {
  generateAuthToken(): any;
  removeToken(): any;
}

export interface IUserModel extends Model<IUserDocument> {
  id: any;
  findbyToken(token: string): any;
  findByCredentials(identity: string, password: string): any;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 20,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 35
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 35
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value)
      }
    },
    role: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    company: {
      type: String
    },
    birthYear: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
      maxLength: 35
    },
    activated: {
      type: Boolean,
      default: false
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

UserSchema.virtual('id').get(function(this: IUserDocument): VirtualType {
  return this._id.toHexString();
});

UserSchema.set('toObject', { virtuals: true });

UserSchema.methods.toJSON = function(): any {
  return pick(this.toObject(), [
    'id',
    'email',
    'firstName',
    'lastName',
    'username',
    'birthYear',
    'activated',
    'company',
    'role',
    'title'
  ]);
};

UserSchema.methods.generateAuthToken = async function(this: IUserDocument) {
  const access = 'auth';

  const token =
    process.env.JWT_SECRET &&
    jsonwebtoken
      .sign({ access, id: this._id.toHexString() }, process.env.JWT_SECRET)
      .toString();

  this.tokens.push({ access, token });
  const firebaseCustomToken = await generateFirebaseToken(this.id, this.role);

  return this.save().then(async () => {
    return {
      auth: token,
      firebase: firebaseCustomToken
    };
  });
};

async function generateFirebaseToken(userId: any, role: any) {
  const additionalClaims = {
    role
  };

  return firebaseAdmin
    .auth()
    .createCustomToken(userId, additionalClaims)
    .then(customToken => customToken);
}

UserSchema.methods.removeToken = function(token: string) {
  return this.updateOne({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.statics.findbyToken = function(token: string) {
  try {
    const decoded: any =
      process.env.JWT_SECRET &&
      jsonwebtoken.verify(token, process.env.JWT_SECRET);

    return this.findOne({
      _id: decoded.id,
      'tokens.access': 'auth',
      'tokens.token': token
    });
  } catch (e) {
    return Promise.reject();
  }
};

function getEmailOrUsername(identity: string) {
  if (identity.indexOf('@') !== -1) {
    return { email: identity };
  }
  return { username: identity };
}

UserSchema.statics.findByCredentials = function(
  identity: string,
  password: string
) {
  return this.findOne(getEmailOrUsername(identity)).then((user: any) => {
    if (!user || !user.activated) return Promise.reject();

    return new Promise((resolve: any, reject: any) => {
      bcryptjs.compare(password, user.password, (_, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(this: IUserDocument, next: any) {
  if (this.isModified('password')) {
    bcryptjs.genSalt(10, (_, salt) => {
      bcryptjs.hash(this.password, salt, (_, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = model<IUserDocument, IUserModel>('User', UserSchema);

export { User };
