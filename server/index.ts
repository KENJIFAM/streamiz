import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import StreamsController from './controllers/StreamsController';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', StreamsController);

app.get('/*', (req: express.Request, res: express.Response) => {
  res.send('Welcome to Streamiz APIs!');
});

app.listen(5000, () => {
  console.log(`Server is running at port 5000`);
});
