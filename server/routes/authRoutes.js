import express from "express";
const router = express.Router();
import passport from "passport";
import { authController } from "../controllers/authController.js";
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get("/genToken", authController.generateToken);
router.get(
  "/google/callback",
  passport.authenticate("google", {
  }),
  authController.handlePassportCallback
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
  }),
  authController.handlePassportCallback
);
export default router