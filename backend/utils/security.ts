import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

// Hash function
export const generateHash = async (value: string, salt: string ) => {
  return await bcrypt.hash(value, salt);
};


export const generateToken = (id:any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXP,
  });
};


