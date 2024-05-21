import React, { useEffect } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ReactDOM from "react-dom";
const FormSchema = z.object({
  title: z
    .string()
    .max(20, { message: "Title can only have maximum 20 letters" })
    .transform(fullname => fullname.trim())
    .refine(fullname => fullname.length >= 2, {
      message:
        "Title should at least consist of 3 letters after removing spaces",
    }),
  category: z
    .string()
    .min(3, "Category should at least consist of 3 letters")
    .max(15, { message: "category can only have maximum 15 letters" })
    .transform(fullname => fullname.trim())
    .refine(fullname => fullname.length >= 2, {
      message:
        "Title should at least consist of 3 letters after removing spaces",
    }),
  notes: z.string().min(3, "Note should at least consist of 3 letters"),
  links: z
    .string()
    .refine(
      links => {
        if(!links){
          return true
        }
        const linksArray = links.split(",").map(link => link.trim());
        return linksArray.every(link => {
          const urlRegex =
            /^(http:\/\/|https:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          return urlRegex.test(link);
        });
      },
      {
        message: "Each link must be a valid URL.",
      }
    )
    .optional(),
  file: z.instanceof(FileList)
    .optional(),
});
interface IdeaFormProps {
  onSubmit: (formData: FieldValues) => void;
  onClose:()=>void
} 

export interface IdeaFormData {
  title: string;
  category: string;
  notes: string;
  links?: string[];
  attachments?: string[];
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });


  return ReactDOM.createPortal(
    <div className="fixed inset-0  overflow-scroll bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" mt-20 p-6 bg-white  rounded shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center  pt-2 mb-0 pb-0">
          <h3 className="text-lg font-light">Add Your Idea</h3>
          <p onClick={onClose} className="cursor-pointer -mr-1">
            <IoCloseOutline size={30} />
          </p>
        </div>
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
            <Input
              {...register("category")}
              type="text"
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
            <label
              htmlFor="links"
              className="block text-sm font-medium text-gray-700"
            >
              Links (separate each link with a comma):
            </label>
            <Textarea
              {...register("links")}
              id="links"
              name="links"
              placeholder="Enter links here..."
              className={`mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md ${
                errors.links ? "border-red-500" : ""
              }`}
            />
            {errors.links && (
              <p className="mt-2 text-sm text-red-600">
                {errors.links.message as string}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="attachments"
              className="block text-sm font-medium text-gray-700"
            >
              Attachments
            </label>
            <Input
              type="file"
              {...register("file")}
              
            ></Input>
            {errors.file && (
              <p className="mt-2 text-sm text-red-600">
                {errors.file.message as string}
              </p>
            )}
          </div>
          <div className=" ">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Idea
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default IdeaForm;
