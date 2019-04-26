import mongoose from 'mongoose';
import Stream from './Stream';
import User from './User';
import keys from '../keys';

mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
(<any>mongoose).Promise = Promise;

const url = `mongodb://${keys.mongoUser}:${keys.mongoPassword}@${keys.mongoHost}:${keys.mongoPort}/${keys.mongoDatabase}?authMechanism=SCRAM-SHA-1&authSource=admin`;
const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000
};
mongoose.connect(url, options, )
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log('MongoDB connection error. ' + err));

export default { Stream, User };