import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { rateLimiter } from './config/rate-limit';
import requestLogger from './middleware/requestLogger';
import errorHandler from './middleware/errorHandler';

const app = express();

// trust proxy
app.set('trust proxy', 1);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(cors());
app.use(helmet());

// Logger
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
  req.log.info('Hello World!');
  res.send('Hello World!');
});

app.get('/error', () => {
  throw new Error('Oops');
});

// Error handlers
app.use(errorHandler);

export { app };
