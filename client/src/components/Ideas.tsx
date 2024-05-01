import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Idea {
  userId: string;
  title: string;
  category: string;
  notes: string;
  links?: string[];
  status: "Pending" | "InProgress" | "Completed";
  attachments?: string[];
}
const Ideas = () => {
  const [ideas, setIdea] = useState<Idea[] | []>([]);
  useEffect(() => {
    async function getIdeas() {
      const res = await fetch(`${BASE_URL}/api/idea/`, {
        credentials: "include",
      });
      const data = await res.json();
      setIdea(data);
      console.log("res data", data);
    }

    getIdeas();
  }, []);
  return (
    <>
      {ideas.map((idea, key) => (
        <div key={key}>{idea?.title}</div>
      ))}
    </>
  );
};

export default Ideas;
