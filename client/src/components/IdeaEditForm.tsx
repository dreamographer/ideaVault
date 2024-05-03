import React, { useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
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
const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title should at least consist of 3 letters"),
  category: z.string().min(3, "Category should at least consist of 3 letters"),
  notes: z.string().min(3, "Note should at least consist of 3 letters"),
  status: z.enum(["Pending", "InProgress", "Completed"]),
});
interface IdeaEditFormProps {
  onSubmit: (formData: FieldValues) => void;
  onDelete: (id: string) => void;
  idea: Idea;
}

// export interface IdeaEditFormData {
//   title: string;
//   category: string;
//   notes: string;
//   links?: string[];
//   attachments?: string[];
// }

const IdeaEditForm: React.FC<IdeaEditFormProps> = ({
  onSubmit,
  onDelete,
  idea,
}) => {
  const [toggle, setToggle] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div>
      <AlertDialog>
        <div className="bg-white  p-6 rounded shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <Input
                {...register("title")}
                type="text"
                id="title"
                name="title"
                defaultValue={idea.title}
                className={`mt-1 block w-full h-9 border-gray-300 shadow-sm sm:text-sm rounded-md ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.title.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <input
                type="hidden"
                defaultValue={idea._id}
                {...register("id")}
                id="id"
                name="id"
              />
              <Input
                {...register("category")}
                type="text"
                defaultValue={idea.category}
                id="category"
                name="category"
                className={`mt-1 h-9 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md ${
                  errors.category ? "border-red-500" : ""
                }`}
              />
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.category.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes:
              </label>
              <Textarea
                {...register("notes")}
                defaultValue={idea.notes}
                id="notes"
                name="notes"
                className={`mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md ${
                  errors.notes ? "border-red-500" : ""
                }`}
              />
              {errors.notes && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.notes.message as string}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="status">Status:</label>
              <select
                {...register("status")}
                id="status"
                name="status"
                defaultValue={idea.status}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
              </select>
              {/* Display validation errors if any */}
              {errors.status && <p>{errors.status.message as string}</p>}
            </div>
            <div className="flex gap-3">
              <DialogClose asChild>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  SAVE
                </button>
              </DialogClose>
              <AlertDialogTrigger>
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-red-700 text-white rounded"
                >
                  DELETE
                </button>
              </AlertDialogTrigger>
              <DialogClose asChild></DialogClose>
            </div>
          </form>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(idea._id)}>
              <DialogClose asChild>
                <button>Yes</button>
              </DialogClose>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IdeaEditForm;
