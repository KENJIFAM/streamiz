import mongoose from 'mongoose';
import Stream from './Stream';
import User from './User';

mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
(<any>mongoose).Promise = Promise;

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log('MongoDB connection error. ' + err));

export default { Stream, User };