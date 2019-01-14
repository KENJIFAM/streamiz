import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import StreamsController from './controllers/StreamsController';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', StreamsController);

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname , '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});

declare const module: any;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}