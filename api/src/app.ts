import './setup/secrets';
import './setup/database';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { logger } from './core/middleware/logger';
import { logStartUp } from './startup';
import routes from './core/routes';

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://client.devpie.io'],
  exposedHeaders: ['x-auth', 'x-firebase'],
  optionsSuccessStatus: 200
};

app.use(logger);
app.use(cors(corsOptions));
app.set('port', process.env.PORT || 4000);
app.options('*', cors(corsOptions));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(`${process.env.API_NAMESPACE}`, routes);

app.get('/', (_, res) => {
  res.status(200).send({ message: 'Welcome' });
});

app.listen(app.get('port'), () => logStartUp());

export { app };
