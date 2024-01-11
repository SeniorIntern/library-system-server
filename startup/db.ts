import 'dotenv/config'
import mongoose from 'mongoose'
import winston from 'winston';

export default function() {
  mongoose.connect(process.env.URI!).then(() => {
    winston.info('Connected to MongoBD....');
  });
};
