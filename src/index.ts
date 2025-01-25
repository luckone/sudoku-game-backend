import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { AppDataSource } from './config/database';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';
import { logger } from "./utils/logger";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    logger.info('Database connection initialized');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => logger.error('Database connection error:', error));

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});
