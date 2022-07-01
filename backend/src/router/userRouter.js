import express from "express";
import { getUser, getUserInfo, Logout, postLogin } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/profile", getUser);
userRouter.get("/logout", Logout);
userRouter.post("/login", postLogin);
userRouter.get("/:id", getUserInfo);

export default userRouter;