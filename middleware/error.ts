import winston from "winston";
import { ErrorRequestHandler } from 'express'

const error: ErrorRequestHandler = (err, req, res, next) => {
  // log the exception
  winston.error(err.message, err);
  res.status(500).send('Something Failed.');
};

export default error
