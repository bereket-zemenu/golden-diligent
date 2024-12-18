import express from "express";
import {
  getUserCount,
  loginUser,
  registerUser,
  usersList,
  verifyOTP,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/login", loginUser);
userRouter.get("/list", usersList);
userRouter.get("/count", getUserCount);

export default userRouter;
