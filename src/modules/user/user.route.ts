import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// get => /api/v1/user
router.post("/signup", UserController.CreateUser);
router.post("/signin", UserController.LoginUser);
router.post("/social-login", UserController.SocialLogin);
router.post("/refresh-token", UserController.RefreshToken);
router.get("/me", auth(), UserController.GetMe);

export const userRoutes = router;
