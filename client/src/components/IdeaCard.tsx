import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
  let color
  switch(idea.status){
    case "Completed":{
      color = "green-400";
      break;
    }
    case "InProgress":{
      color = "orange-400";
      break;
    }
    case "Pending":{
      color = "yellow-400";
      break;
    }
  }
  return (
    <>
      <Card className={`p-5 bg-${color} text-white`}>
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
