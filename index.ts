import express from 'express'
const app = express()

import cors from 'cors'
app.use(cors())

import initializeLogging from './startup/logging';
import initializeDB from './startup/db';
import initializeRoutes from './startup/routes';
import initializeProd from './startup/prod';
import winston from 'winston';

initializeLogging();
initializeDB();
initializeRoutes(app);
initializeProd(app);

const port = 3001
app.listen(port, async () => {
  winston.info(`listening on port: ${port}, URI= ${process.env.URI}, JWT Key= ${process.env.jwtPrivateKey}`);
})
