import { pick } from 'lodash';
import { User } from './model';
import { ObjectID } from 'mongodb';
import { Response, Request } from 'express';
import { IAuthedRequest } from '../types';
import { sendActivationLink } from '../email/functions';

export async function activate(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  if (!req.user.activated) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { activated: true } },
        { new: true }
      );
      !user && res.status(404).send();
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { identity, password } = pick(req.body, ['identity', 'password']);
  try {
    const user = await User.findByCredentials(identity, password);

    user.generateAuthToken().then((token: any) => {
      res.header('x-auth', token.auth);
      res.header('x-firebase', token.firebase).send(user);
    });
  } catch (error) {
    res.status(401).send({
      error: `Attempted to log into non-existing account or with wrong credentials.
       Please Review your email and password.`
    });
  }
}

export async function logout(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const id = req.params.id;

  !ObjectID.isValid(id) && res.status(404).send();
  !req.user._id.toHexString() === id && res.status(401).send();

  try {
    const result = await req.user.removeToken(req.token);
    result && res.status(200).send({});
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function updateOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const id = req.params.id;
  const body = pick(req.body, ['firstName', 'lastName', 'email']);

  !req.user._id.toHexString() === id && res.status(401).send();

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    !user && res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getOne(
  req: IAuthedRequest,
  res: Response
): Promise<void> {
  const id = req.params.id;
  !ObjectID.isValid(id) && res.status(404).send();

  try {
    const user = await User.findOne({ _id: id });
    !user && res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function addOne(req: Request, res: Response): Promise<void> {
  const body = pick(req.body, [
    'role',
    'title',
    'email',
    'company',
    'birthYear',
    'password',
    'firstName',
    'lastName',
    'username'
  ]);

  const newUser = new User(body);
  try {
    const token = await newUser.generateAuthToken();
    await sendActivationLink(body.email, token.auth);
    newUser
      .save()
      .then(() => {
        res.status(200).send({});
      })
      .catch((error: any) => {
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function checkUsername(
  req: Request,
  res: Response
): Promise<void> {
  const { username } = pick(req.body, ['username']);
  try {
    const user = await User.findOne({ username });
    !user && res.status(200).send({});
    res.status(409).send({ message: 'Username already exists' });
  } catch (error) {
    res.status(400).send(error);
  }
}
