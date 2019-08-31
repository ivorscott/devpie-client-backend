import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI;
const log = (msg: string) => console.log(msg);

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connection.on('disconnected', () => log('\nMongo disconnected'.red));
mongoose.connection.on('connected', () => log(`Mongo Connected`.green));

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0, // return errors immediately rather than waiting for reconnect
  useCreateIndex: true,
  useNewUrlParser: true
};

function connectWithRetry() {
  console.log('MongoDB connection with retry');
  mongoUri &&
    mongoose
      .connect(mongoUri, options)
      .then(() => {
        console.log('MongoDB is connected');
      })
      .catch((e: Error) => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
        setTimeout(connectWithRetry, 5000);
        console.log(e);
      });
}

connectWithRetry();

// CAPTURE APP TERMINATION & RESTART EVENTS TO SHUTDOWN DATABASE CONNECTION

// on process restart or termination
function gracefulShutdown(msg: string, callback: any) {
  mongoose.connection.close(() => {
    log(`Mongo disconnected through ${msg}`.red);
    callback();
  });
}

// on nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// on app termination
process.on('SIGINT', () => {
  gracefulShutdown('App termination (SIGINT)', () => {
    process.exit(0);
  });
});

// on Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('App termination (SIGTERM)', () => {
    process.exit(0);
  });
});
