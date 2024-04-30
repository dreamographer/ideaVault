import express from "express";
import ideaController from "../controllers/ideaController.js";

const router = express.Router();

router.get("/", ideaController.getAllIdeas);
router.get("/:id", ideaController.getIdeaById);
router.post("/", ideaController.createIdea);
router.put("/:id", ideaController.updateIdea);
router.delete("/:id", ideaController.deleteIdea);


export default router;
