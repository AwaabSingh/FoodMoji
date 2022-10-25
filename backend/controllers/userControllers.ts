import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models";

/**
 * @description Get User Profile
 * @method GET
 * @route /api/user/profile
 * @access private
 */
export const getProfile = asyncHandler( async(req: Request, res:Response) => {
      const user = await User.findById(req.user._id)

      
})