import express from "express";
import ideaController from "../controllers/ideaController.js";
import passport from "../config/auth.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get(
  "/",isAuthenticated,
  ideaController.getAllIdeas
);
router.get("/logout",isAuthenticated,ideaController.logout);
router.get("/:id",isAuthenticated,ideaController.getIdeaById);
router.post("/", isAuthenticated,ideaController.createIdea);
router.put("/:id",isAuthenticated, ideaController.updateIdea);
router.delete("/:id",isAuthenticated, ideaController.deleteIdea);


export default router;
