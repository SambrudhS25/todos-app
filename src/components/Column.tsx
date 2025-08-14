import { Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: string;
};

type ColumnProps = {
  status: string;
  title: string;
  tasks: Task[];
  onEdit: (taskId: string, field: "title" | "description", value: string) => void;
  onDelete: (taskId: string) => void;
};

export default function Column({ status, title, tasks: initialTasks,onEdit,onDelete }: ColumnProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);



  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div>
          <h2 className="text-lg font-bold mb-2 justify-center">{title}</h2>
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 rounded p-4 w-72 h-100 overflow-y-scroll"
        >
          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              id={task._id}
              index={index}
              title={task.title}
              description={task.description}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {provided.placeholder}
        </div>
         </div>
      )}
    </Droppable>
  );
}
