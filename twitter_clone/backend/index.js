import { db_uri } from './db/index.js';
import express from 'express';
import session from 'express-session';
import path from 'path';
import url from 'url';
import morgan from 'morgan';
import router from './router/index.js';
import MongoStore from 'connect-mongo';
import 'express-async-errors';

const app = express();
// common middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    secret: 'proj3',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: db_uri,
    }),
  }),
);
// serve build files
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..', 'dist')));
router(app);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err.message);
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server listening at: http://localhost:' + port);
});
