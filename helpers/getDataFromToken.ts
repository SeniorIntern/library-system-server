import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.get("token")?.value || '';
    const decodedToken: any = jwt.verify(token, process.env.jwtPrivateKey!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

