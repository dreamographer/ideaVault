import express from "express";
const router = express.Router();
import passport from "passport";
import { authController } from "../controllers/authController";
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  authController.handlePassportCallback.bind(controller)
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  authController.handlePassportCallback.bind(controller)
);
export default router