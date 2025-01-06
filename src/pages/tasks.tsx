import { useTasksControllerGetTasks } from "@/api/backend/tasks/tasks";
import { columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";
import { TaskForm } from "@/components/tasks/tasks-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const TasksPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data } = useTasksControllerGetTasks();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div>
          <Button onClick={() => setOpen(true)}>Create a new task</Button>
        </div>
      </div>
      <DataTable data={data ?? []} columns={columns} />
      <TaskForm open={open} onOpenChange={setOpen} />
    </div>
  );
};
