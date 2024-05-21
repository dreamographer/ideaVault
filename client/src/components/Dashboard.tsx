import { useEffect, useState } from "react";
import IdeaForm from "./IdeaForm";
import axios from "axios";
import IdeaCard from "./IdeaCard";
import { Button } from "./ui/button";
import { FieldValues } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import IdeaEditForm from "./IdeaEditForm";
import { useNavigate } from "react-router-dom";
import { FaRegLightbulb } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Idea {
  _id: string;
  userId: string;
  title: string;
  category: string;
  notes: string;
  links?: string[];
  status: "Pending" | "InProgress" | "Completed";
  attachments?: string[];
}
const Dashboard = () => {
  const [ideaForm, setIdeaForm] = useState(false);
  const [ideas, setIdea] = useState<Idea[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getIdeas() {
      const res = await fetch(`${BASE_URL}/api/idea/`, {
        credentials: "include",
      });

      const data = await res.json();
      console.log("result", data);
      setIdea(data);
    }

    getIdeas();
  }, []);
  const toggleAddIdea = () => {
    setIdeaForm(!ideaForm);
  };

  const handleFile = async (file: FileList) => {
    try {
      const storageRef = ref(storage, `Attachements/${file[0].name}`);
      return (await uploadBytes(storageRef, file[0])).metadata.fullPath;
    } catch (error) {
      console.log("Error uploading file", error);
    }
  };

  const handleAddIdea = async (formData: FieldValues) => {
    try {
      let filePath;
      if (formData.file) {
        filePath = await handleFile(formData.file);
      }
      formData.filePath = filePath;
      const newIdea = await axios.post(`${BASE_URL}/api/idea/`, formData, {
        withCredentials: true,
      });
      setIdea([...ideas, newIdea.data]);

      setIdeaForm(!ideaForm);
    } catch (error) {
      console.error("Error adding idea:", error);
    }
  };

  const handleEditIdea = async (formData: FieldValues) => {
    try {
      const updatedIdea = await axios.put(
        `${BASE_URL}/api/idea/${formData.id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      const updatedIndex = ideas.findIndex(idea => idea._id === formData.id);

      if (updatedIndex !== -1) {
        const updatedIdeas = [...ideas];
        updatedIdeas[updatedIndex] = updatedIdea.data;
        setIdea(updatedIdeas);
      }
    } catch (error) {
      console.error("Error adding idea:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/idea/${id}`, {
        withCredentials: true,
      });
      setIdea(prevIdeas => prevIdeas.filter(idea => idea._id !== id));
    } catch (error) {
      // Handle error
      console.error("Error adding idea:", error);
    }
  };
  const handleLogout = async () => {
    await axios.get(`${BASE_URL}/api/idea/logout`, {
      withCredentials: true,
    });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="pb-14 px-3">
        <div className="p-5 flex justify-between ">
          <h1 className="text-3xl  text-center font-light">IdeaValut</h1>
          <button
            className="bg-red-500  p-2 rounded-md text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="w-full sticky top-0  text-center text-5xl font-thin">
          <h2>My Ideas</h2>
        </div>
        <div className="flex gap-5   flex-wrap justify-center mt-10">
          {ideas.length < 1 && (
            <div className="h-80 w-screen flex justify-center items-center">
              <h1 className="text-center text-4xl font-thin  ">
                "Capture and nurture your creativity - add your ideas to
                IdeaVault!"
              </h1>
            </div>
          )}
          {ideas.map(idea => (
            <>
              <Dialog key={idea._id}>
                <DialogTrigger>
                  <IdeaCard idea={idea} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader></DialogHeader>
                  <IdeaEditForm
                    idea={idea}
                    onSubmit={handleEditIdea}
                    onDelete={handleDelete}
                  />
                </DialogContent>
              </Dialog>
            </>
          ))}
        </div>
        <div className="flex  bottom-4 justify-center w-full fixed items-end">
          <Button className="text-md" onClick={toggleAddIdea}>
            Add Idea &nbsp; <FaRegLightbulb />
          </Button>
        </div>
        {ideaForm && (
          <IdeaForm onClose={toggleAddIdea} onSubmit={handleAddIdea} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
