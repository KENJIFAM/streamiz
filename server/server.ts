import express from 'express';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname , '../dist/index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});

declare const module: any;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}