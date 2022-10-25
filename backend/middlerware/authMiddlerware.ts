import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request as ExpressRequest, Response } from "express";
import asyncHnadler from "express-async-handler";
import { UserDocument, User } from "../models";

export interface Request extends ExpressRequest {
  user: UserDocument;
}
export const protect = asyncHnadler(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    let token: string | JwtPayload;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded: string | JwtPayload = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;

        req.user = await User.findById(decoded.id);

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }


    
  }
);
