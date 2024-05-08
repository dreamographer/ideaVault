import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "../lib/utils";
interface Idea {
  userId: string;
  title: string;
  category: string;
  notes: string;
  links?: string[];
  status: "Pending" | "InProgress" | "Completed";
  attachments?: string[];
}
interface Props {
  idea: Idea;
}
const IdeaCard = ({ idea }: Props) => {
  let [color, setColor] = useState("black");
  useEffect(() => {
    switch (idea.status) {
      case "Completed": {
        setColor("bg-green-400");
        break;
      }
      case "InProgress": {
        setColor("bg-orange-400");
        break;
      }
      case "Pending": {
        setColor("bg-yellow-400");
        break;
      }
    }
  }, [idea]);

  return (
    <>
      <Card className={cn("p-5 text-white",color)}>
        <CardHeader>
          <CardTitle>{idea.title}</CardTitle>
        </CardHeader>
        <CardDescription>category</CardDescription>
        <CardContent>
          <p>{idea.category}</p>
        </CardContent>
        <CardDescription>status</CardDescription>
        <CardFooter className="flex justify-center">
          <p className="text-center">{idea.status}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default IdeaCard;
