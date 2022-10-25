import { Request, Response, Router } from "express";
import { User } from "../models";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateHash, generateToken, sendConfirmationEmail } from "../utils";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

/**
 * @description Register User
 * @method POST
 * @route /api/auth
 * @access public
 */

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone, address, role, confirmationCode } =
    req.body;

  const code = uuidv4();
  //   Checking for input fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user exists in the db
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // gen salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await generateHash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    role,
    confirmationCode: code,
  });

  if (user) {
    sendConfirmationEmail(user.name, user.email, user.confirmationCode);
    res.status(201).json({
      msg: "User created successfully! Please check your mail",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Credentials");
  }
});

/**
 * @description Verify User
 * @method GET
 * @route /api/auth/confirm/:confirmationCode
 * @access public
 */

export const verifyUserAcct = asyncHandler(
  async (req: Request, res: Response) => {
    const { confirmationCode } = req.params;
    // compare the confimation code

    const confirmUser = await User.findOne({ confirmationCode });

    if (!confirmUser) {
      res.status(404);
      throw new Error("User not found");
    } else {
      confirmUser.status = "Active";
      await confirmUser.save();

      res.status(200).json({
        msg: "Verification Successful. You can login now",
        status: confirmUser.status,
      });
    }
  }
);

/**
 * @description Login User
 * @method POST
 * @route /api/auth/login
 * @access public
 */

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check user input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //  check for user exists
  const user = await User.findOne({ email });

  // Check for user and compare plain password to hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.status === "Pending") {
      res.status(400);
      throw new Error("Pending Account. Please Verify Your Enail Account");
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
