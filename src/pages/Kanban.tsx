import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Column from "../components/Column";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "to-do" | "in-progress" | "done";
};

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToAdd, setTaskToAdd] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  useEffect(() => {
    api
      .get("/tasks/")
      .then((res) => setTasks(res.data))
      .catch(() => alert("Failed to load tasks"));
  }, []);


  const handleDelete = (taskId: string) => {

try{
   api.delete(`/tasks/${taskId}`);
  setTasks(prev => prev.filter(task => task._id !== taskId));
  }
  catch(err){
    alert('failed to delete')
}
  
};


  const handleEdit = (taskId: string, field: "title" | "description", value: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );

    api.put(`/tasks/${taskId}`, { [field]: value }).catch(() => {
      alert("Failed to update task");
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const colTasks = tasks.filter(t => t.status === source.droppableId);
      const [moved] = colTasks.splice(source.index, 1);
      colTasks.splice(destination.index, 0, moved);

      setTasks((prev) => [
        ...prev.filter((t) => t.status !== source.droppableId),
        ...colTasks
      ]);
    } else {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === draggableId
            ? { ...t, status: destination.droppableId as Task["status"] }
            : t
        )
      );

      api
        .put(`/tasks/${draggableId}`, { status: destination.droppableId })
        .catch(() => alert("Failed to update task"));
    }
  };

  const addTask = () => {
    if (!taskToAdd) return alert("Title is required");

    api
      .post("/tasks/", {
        title: taskToAdd,
        description: taskDescription,
      })
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
        setTaskToAdd("");
        setTaskDescription("");
      })
      .catch(() => alert("Failed to add task"));
  };

  return (
    <div>
    <h1 className=" mb-4.5 justify-center justify-self-center">Welcome to Todos app</h1>

<div className="flex flex-wrap justify-center w-full mr-72 gap-4">
      {/* Input section */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        <input
          className="w-full p-2 border rounded border-black"
          placeholder="Task title"
          value={taskToAdd}
          onChange={(e) => setTaskToAdd(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded border-black"
          placeholder="Task description (optional)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-500 text-black rounded hover:bg-blue-600"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Kanban columns */}
      <div className="flex justify-center gap-4 flex-wrap w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Column
            status="to-do"
            title="To Do"
            tasks={tasks.filter((t) => t.status === "to-do")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Column
            status="in-progress"
            title="In Progress"
            tasks={tasks.filter((t) => t.status === "in-progress")}
            onEdit={handleEdit}
            onDelete={handleDelete}

          />
          <Column
            status="done"
            title="Done"
            tasks={tasks.filter((t) => t.status === "done")}
            onEdit={handleEdit}
            onDelete={handleDelete}

          />
        </DragDropContext>
      </div>
    </div>
    </div>

  );
}
