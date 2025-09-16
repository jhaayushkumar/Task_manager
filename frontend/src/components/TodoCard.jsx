import { useState } from "react";
import { HoverBorderGradient } from "../components/ui/HoverBorderGradient";
import { GlowingEffect } from "../components/ui/GlowingEffect";

const TodoCard = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority || 1);
  const [todotype, setTodotype] = useState(todo.todotype || "");

  const handleSave = async () => {
    if (!onUpdate) return setIsEditing(false);
    await onUpdate({ ...todo, title, description, priority, todotype });
    setIsEditing(false);
  };

  return (
    <div
      className={`relative overflow-hidden isolate p-4 rounded shadow-md flex justify-between items-start gap-3 ${
        todo.completed ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-900/70"
      }`}
    >
      <GlowingEffect />
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={onToggle}
          className="mt-1 h-5 w-5 accent-green-600"
        />

        {!isEditing ? (
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-500" : "text-gray-100"}`}>
              {todo.title} (Priority: {todo.priority})
            </h3>
            {todo.description && <p className="text-gray-300 break-words">{todo.description}</p>}
            {todo.todotype && (
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-blue-900/40 text-blue-200">
                {todo.todotype}
              </span>
            )}
          </div>
        ) : (
          <div className="grid gap-2 flex-1">
            <input
              className="border border-white/10 p-2 rounded bg-gray-900/60 text-gray-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border border-white/10 p-2 rounded bg-gray-900/60 text-gray-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                className="border border-white/10 p-2 rounded bg-gray-900/60 text-gray-100"
                value={todotype}
                onChange={(e) => setTodotype(e.target.value)}
              >
                <option value="">Type</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="urgent">Urgent</option>
                <option value="other">Other</option>
              </select>
              <input
                type="number"
                min={1}
                max={5}
                className="border border-white/10 p-2 rounded bg-gray-900/60 text-gray-100"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        {!isEditing ? (
          <>
            {onUpdate && (
              <div className="group inline-flex">
                <HoverBorderGradient containerClassName="rounded-md" as="div">
                  <button onClick={() => setIsEditing(true)} className="px-2 py-1 rounded-md bg-transparent text-gray-100">
                    Edit
                  </button>
                </HoverBorderGradient>
              </div>
            )}
            <div className="group inline-flex">
              <HoverBorderGradient containerClassName="rounded-md" as="div">
                <button onClick={onDelete} className="px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-500">
                  Delete
                </button>
              </HoverBorderGradient>
            </div>
          </>
        ) : (
          <>
            <div className="group inline-flex">
              <HoverBorderGradient containerClassName="rounded-md" as="div">
                <button onClick={handleSave} className="px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
              </HoverBorderGradient>
            </div>
            <div className="group inline-flex">
              <HoverBorderGradient containerClassName="rounded-md" as="div">
                <button onClick={() => setIsEditing(false)} className="px-2 py-1 rounded-md bg-transparent text-gray-100">Cancel</button>
              </HoverBorderGradient>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
  