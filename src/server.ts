import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { rateLimiter } from './config/rate-limit';

const app = express();
// trust proxy
app.set('trust proxy', 1);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(cors());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
