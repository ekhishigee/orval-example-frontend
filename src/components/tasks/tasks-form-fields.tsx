import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TaskFormType } from "./use-tasks-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const TasksFormFields = () => {
  const form = useFormContext<TaskFormType>();

  return (
    <div>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <div className="py-2">
            <FormItem className="py-2">
              <div className="w-full flex justify-start items-center">
                <Label>Title</Label>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Please enter title"
                  className="border border-[#CECECE] px-2 font-medium text-sm placeholder:text-[#838383] rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}
      />
    </div>
  );
};
