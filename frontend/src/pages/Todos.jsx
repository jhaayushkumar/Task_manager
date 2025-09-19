import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todos";
import TodoCard from "../components/TodoCard";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { TextHoverEffect } from "../components/ui/TextHoverEffect";
import { StatefulButton } from "../components/ui/StatefulButton";
import { HoverBorderGradient } from "../components/ui/HoverBorderGradient";
import { TypewriterEffectSmooth } from "../components/ui/TypewriterEffectSmooth";
import { GlowingEffect } from "../components/ui/GlowingEffect";

const Todos = () => {
  const { token, user } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState("");
  const [todotype, setTodotype] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastTodo, setLastTodo] = useState(null);

  // Fetch all todos on token availability
  const fetchTodos = async () => {
    if (!token) return;
    try {
      const data = await getTodos(token, search);
      setTodos(Array.isArray(data.todos) ? data.todos : []);
    } catch (err) {
      console.warn("Fetch todos failed", err?.message || err);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, search]);

  // Handle creating new todo
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Frontend validation: title and type are required
      if (!title.trim() || !todotype) {
        setError("Title and type are required");
        setTimeout(() => setError(""), 1500);
        return;
      }
      const created = await createTodo(
        {
          title,
          description,
          todotype,
          priority,
          userId: user.id,
          userEmail: user.email,
        },
        token
      );
      setLastTodo(created);
      setTitle("");
      setDescription("");
      setPriority(1);
      setTodotype("");
      setShowToast(true);
      setModalOpen(true);
      setTimeout(() => setShowToast(false), 1200);
    } catch (err) {
      console.error("Error creating todo:", err);
      setError("Failed to add todo");
      setTimeout(() => setError(""), 1200);
    }
  };

  // Exact title matches only (case-insensitive)
  const exactMatches = (search || "").trim().length
    ? todos.filter((t) => t.title?.toLowerCase() === search.toLowerCase())
    : [];

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Grid background overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
      {/* Radial mask for subtle fade */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-6 relative">
        <section className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow max-w-3xl mx-auto">
          <div className="text-center">
            <TypewriterEffectSmooth
              words={[
                { text: "Plan", className: "font-extrabold" },
                { text: "smarter.", className: "font-extrabold" },
                { text: "Do", className: "font-extrabold" },
                { text: "faster.", className: "font-extrabold" },
              ]}
              className="text-3xl md:text-4xl"
            />
            <TypewriterEffectSmooth
              words={[
                { text: "Add tasks in a click," },
                { text: "get AI tips," },
                { text: "and track progress effortlessly." },
              ]}
              className="mt-2 opacity-90"
            />
            <TypewriterEffectSmooth
              words={[
                {
                  text: "Type exact titles in the search to preview matching tasks.",
                },
              ]}
              className="mt-1 opacity-80 text-sm"
            />
          </div>
        </section>

        {showToast && (
          <div className="absolute right-6 top-6 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow animate-[slide-in_0.2s_ease-out,fade-out_1.2s_ease-in_forwards]">
            <span className="text-xl">✓</span>
            <span>Todo added successfully</span>
          </div>
        )}
        {error && (
          <div className="absolute right-6 top-6 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded shadow animate-[slide-in_0.2s_ease-out,fade-out_1.2s_ease-in_forwards]">
            <span>Failed to add todo</span>
          </div>
        )}

        <div className="mb-4">
          <div className="w-full max-w-2xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by exact title..."
              className="w-full border border-white/10 bg-gray-900/70 p-3 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <form
          id="quick-add"
          onSubmit={handleCreate}
          className="relative overflow-hidden isolate bg-gray-950/80 backdrop-blur p-7 rounded-2xl shadow-md border border-white/10 ring-1 ring-white/10 transition hover:ring-white/40 w-full max-w-2xl mx-auto min-h-[380px]"
        >
          <GlowingEffect />
          {/* Dark Grid background layers inside form */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black opacity-80 dark:opacity-90"></div>
            <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] [background-position:center_center] opacity-60"></div>
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
          </div>

          <h2 className="text-xl font-semibold mb-3 text-gray-100">
            Quick Add Todo
          </h2>
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-white/10 p-3 rounded bg-gray-900/60 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              rows={4}
              placeholder="Description (optional)"
              className="w-full border border-white/10 p-3 rounded bg-gray-900/60 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                className="border border-white/10 p-3 rounded bg-gray-900/60 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={todotype}
                onChange={(e) => setTodotype(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose type
                </option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="urgent">Urgent</option>
                <option value="other">Other</option>
              </select>
              <input
                type="number"
                min={1}
                max={5}
                placeholder="Priority (1-5)"
                className="border border-white/10 p-3 rounded bg-gray-900/60 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="group inline-flex w-full justify-center">
              <HoverBorderGradient
                containerClassName="rounded-lg w-full"
                as="div"
                className="w-full"
              >
                <StatefulButton onClick={handleCreate} className="w-full">
                  Add Todo
                </StatefulButton>
              </HoverBorderGradient>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          <p>
            All todos show in the{" "}
            <Link
              to="/profile"
              className="text-indigo-600 dark:text-indigo-400 underline"
            >
              Profile
            </Link>{" "}
            and you can manage (complete/delete) them there.
          </p>
        </div>
        <div className="flex justify-center mb-4 mt-4">
          <TextHoverEffect text="TASKS" />
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="p-4 rounded-xl border border-white/10 bg-gray-900/60">
            <div className="font-semibold mb-1">Example: Work</div>
            <div className="opacity-80">
              "Finish project report" priority 5, type work.
            </div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-gray-900/60">
            <div className="font-semibold mb-1">Example: Personal</div>
            <div className="opacity-80">
              "Buy groceries" priority 3, type personal.
            </div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-gray-900/60">
            <div className="font-semibold mb-1">Example: Urgent</div>
            <div className="opacity-80">
              "Pay bills" priority 4, type urgent.
            </div>
          </div>
        </div>

        {search.trim().length > 0 && (
          <div className="relative overflow-hidden isolate mt-8 bg-gray-950/80 backdrop-blur p-5 rounded-xl shadow-md border border-white/10 w-full max-w-2xl mx-auto">
            <GlowingEffect />
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Search results
            </h3>
            <div className="grid gap-3">
              {exactMatches.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onToggle={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="bg-slate-900/60 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: "8deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0.9, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <FiCheckCircle className="text-white/10 rotate-12 text-[220px] absolute z-0 -top-24 -left-16" />
              <div className="relative z-10">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                  <FiCheckCircle />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">
                  Todo added!
                </h3>
                <p className="text-center mb-6 opacity-90">
                  {lastTodo
                    ? `${lastTodo.title} (${
                        lastTodo.todotype || "type"
                      }) • Priority ${lastTodo.priority}`
                    : "Your task was created successfully."}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Close
                  </button>
                  <Link
                    to="/profile"
                    onClick={() => setModalOpen(false)}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded text-center"
                  >
                    Manage Todos
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Todos;
