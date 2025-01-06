import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useTaskForm } from "./use-tasks-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useEffect } from "react";
import { TasksFormFields } from "./tasks-form-fields";

type Props = {
  open?: boolean;
  onOpenChange?(open: boolean): void;
  values?: {
    id: number;
    title: string;
  };
};
export const TaskForm = ({ open, onOpenChange, values }: Props) => {
  const { form } = useTaskForm();

  const title = form.watch("title");

  useEffect(() => {
    if (open && values?.id) {
      form.setValue("title", values.title);
    }
  }, [open, values]);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = () => {
    console.log("Task:", title);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {!values && <DialogTitle>New task</DialogTitle>}
          {!!values?.id && <DialogTitle>Update task</DialogTitle>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <TasksFormFields />
          </Form>
        </div>
        <DialogFooter>
          <Button onClick={() => form.handleSubmit(onSubmit)()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
