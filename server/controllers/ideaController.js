import Idea from "../model/idea.js";
const ideaController = {
  

  getAllIdeas: async (req, res) => {
    try {
      const user=req.user.tokenData
      const ideas = await Idea.find({ userId: user.userId });
      res.status(200).json(ideas);
    } catch (error) { 
      res.status(500).json({ message: error.message });
    }
  },

  getIdeaById: async (req, res) => {
    try {
      const idea = await Idea.findById(req.params.id);
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      res.status(200).json(idea);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createIdea: async (req, res) => {
    const { title, category, notes, links, status, attachments } = req.body;
    const newIdea = new Idea({
      title,
      category,
      notes,
      links,
      status,
      attachments,
    });
    try {
      const savedIdea = await newIdea.save();
      res.status(201).json(savedIdea);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateIdea: async (req, res) => {
    try {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedIdea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      res.status(200).json(updatedIdea);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteIdea: async (req, res) => {
    try {
      const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
      if (!deletedIdea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      res.status(200).json({ message: "Idea deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ideaController;
