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
  return (
    <>
      <Card className="p-5">
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
