import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Task, taskSchema } from "@/data/schema";
import { useState } from "react";
import { TaskForm } from "./tasks-form";

interface DataTableRowActionsProps {
  row: Row<Task>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const task = taskSchema.parse(row.original);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu>
      <TaskForm
        open={open}
        onOpenChange={setOpen}
        values={{ id: row.original.id, title: row.original.title }}
      />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Statuses</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.status}>
              <DropdownMenuRadioItem key="todo" value="todo">
                Todo
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem key="in-progress" value="in-progress">
                In Progress
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem key="done" value="done">
                Done
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
