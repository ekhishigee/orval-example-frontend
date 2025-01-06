import { CheckCircle, Circle, HelpCircle, Timer } from "lucide-react";

export const Status = ({ status }: { status: string }) => {
  if (status === "todo") {
    return (
      <div className="flex w-[100px] items-center">
        <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>Todo</span>
      </div>
    );
  }

  if (status === "in-progress") {
    return (
      <div className="flex w-[100px] items-center">
        <Timer className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>In Progress</span>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="flex w-[100px] items-center">
        <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>Done</span>
      </div>
    );
  }

  return (
    <div className="flex w-[100px] items-center">
      <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
      <span>Unable</span>
    </div>
  );
};
