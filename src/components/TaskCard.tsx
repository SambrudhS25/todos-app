import { Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

type TaskCardProps = {
  id: string;
  index: number;
  title: string;
  description?: string;
  onEdit: (taskId: string, field: "title" | "description", value: string) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskCard({ id, index, title, description, onEdit,onDelete }: TaskCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(description || "");

  useEffect(() => {
    setNewTitle(title);
    setNewDesc(description || "");
  }, [title, description]);

  const handleTitleSave = () => {
    onEdit(id, "title", newTitle);
    setIsEditingTitle(false);
  };

  const handleDescSave = () => {
    onEdit(id, "description", newDesc);
    setIsEditingDesc(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-white shadow p-2 mb-2 rounded"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* Title */}
          <div className="flex items-center justify-between">
            {isEditingTitle ? (
              <div className="flex gap-2">
                <input
                  className="border rounded p-1 text-sm"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={handleTitleSave} className="text-blue-500 text-sm">
                  Save
                </button>
              </div>
            ) : (
              <>
                <p className="font-semibold">{newTitle}</p>
                <button onClick={() => setIsEditingTitle(true)} className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500 hover:text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.122 2.122 0 013 3L7 19l-4 1 1-4L16.862 3.487z"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Description */}
          <div className="flex items-center justify-between mt-1">
            {isEditingDesc ? (
              <div className="flex gap-2">
                <input
                  className="border rounded p-1 text-sm"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <button onClick={handleDescSave} className="text-blue-500 text-sm">
                  Save
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm">{newDesc}</p>
                <button onClick={() => setIsEditingDesc(true)} className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500 hover:text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.122 2.122 0 013 3L7 19l-4 1 1-4L16.862 3.487z"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
<button className="mx-auto my-2 block text-red-600
 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
 onClick={()=>onDelete(id)}>
  Delete
</button>
        </div>
      )}
    </Draggable>
  );
}
