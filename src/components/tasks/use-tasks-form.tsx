import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type TaskFormType = {
  title: string;
};

export const useTaskForm = () => {
  const formSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return { form };
};
