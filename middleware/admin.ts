import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const admin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send({ status: false, message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey!);
    //@ts-ignore
    req.user = decoded
    next();
  } catch (ex) {
    res.status(400).send({ status: false, message: "Invalid token." });
  }
}

