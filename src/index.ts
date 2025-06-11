import { env } from './config/envConfig';
import { app } from './server';

const server = app.listen(env.PORT, () => {
  const { HOST, PORT, NODE_ENV } = env;

  console.log(`Server (${NODE_ENV}) is running on http://${HOST}:${PORT}`);
});

const onCloseSignals = () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Forcibly exit after 10 seconds
};

// Listening to Process Signals
process.on('SIGINT', onCloseSignals); //  e.g., Ctrl + C
process.on('SIGTERM', onCloseSignals); // e.g., Docker container stop or Kubernetes pod termination
