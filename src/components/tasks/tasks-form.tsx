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
import {
  getTasksControllerGetTasksQueryKey,
  useTasksControllerCreateTask,
  useTasksControllerUpdateTask,
} from "@/api/backend/tasks/tasks";
import { TaskResponseDto } from "@/api/backend/model";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open?: boolean;
  onOpenChange?(open: boolean): void;
  values?: TaskResponseDto;
};
export const TaskForm = ({ open, onOpenChange, values }: Props) => {
  const queryClient = useQueryClient();

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

  const { mutate: create, isPending: isPendingCreate } =
    useTasksControllerCreateTask({
      mutation: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: getTasksControllerGetTasksQueryKey(),
          });
          onOpenChange?.(false);
        },
      },
    });
  const { mutate: update, isPending: isPendingUpdate } =
    useTasksControllerUpdateTask({
      mutation: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: getTasksControllerGetTasksQueryKey(),
          });
          onOpenChange?.(false);
        },
      },
    });

  const onSubmit = () => {
    if (values?.id) {
      update({ id: `${values.id}`, data: { ...values, title } });
    } else {
      create({ data: { title } });
    }
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
          <Button onClick={() => form.handleSubmit(onSubmit)()}>
            {(isPendingCreate || isPendingUpdate) && (
              <Loader2 className="animate-spin w-2 h-2" />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
