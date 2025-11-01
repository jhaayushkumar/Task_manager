import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTodos, updateTodo, deleteTodo } from "../services/todos";
import { updateUser } from "../services/users";
import TodoCard from "../components/TodoCard";
import { HoverBorderGradient } from "../components/ui/HoverBorderGradient";
import { GlowingEffect } from "../components/ui/GlowingEffect";

const Profile = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchTodos = async () => {
    if (!token) return;
    try {
      const data = await getTodos(token);
      setTodos(Array.isArray(data.todos) ? data.todos : []);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setName(user.name || "");
    }
  }, [user]);

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleToggle = async (todo) => {
    try {
      const updated = await updateTodo(todo.id, { ...todo, completed: !todo.completed }, token);
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id, token);
      setTodos(todos.filter((t) => t.id !== id));
    } catch {}
  };

  const handleUpdate = async (payload) => {
    try {
      const updated = await updateTodo(payload.id, payload, token);
      setTodos(todos.map((t) => (t.id === payload.id ? updated : t)));
    } catch {}
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUser(user.id, { name, email });
      setUser({ ...user, ...updated });
      setEditing(false);
    } catch {}
  };

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="pointer-events-none absolute inset-0 -z-10 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-6 grid grid-cols-12 gap-6">
        <aside className="relative overflow-hidden isolate col-span-12 md:col-span-5 lg:col-span-4 rounded-2xl shadow-md border border-white/10 ring-1 ring-white/10 h-fit w-full">
          <GlowingEffect />
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black opacity-80" />
            <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] [background-position:center_center] opacity-60" />
          </div>

          <div className="p-6 text-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl">
                {email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="font-semibold break-all">{email || 'User'}</div>
                <div className="text-xs text-gray-300">Member</div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between bg-white/5 rounded p-2"><span>Total</span><span className="font-semibold">{todos.length}</span></div>
              <div className="flex justify-between bg-white/5 rounded p-2"><span>Completed</span><span className="font-semibold">{completedCount}</span></div>
              <div className="flex justify-between bg-white/5 rounded p-2"><span>Pending</span><span className="font-semibold">{pendingCount}</span></div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Profile</h3>
                <div className="group inline-flex">
                  <HoverBorderGradient containerClassName="rounded-md" as="div">
                    <button onClick={() => setEditing((v) => !v)} className="px-2 py-1 rounded-md bg-transparent text-white">{editing ? 'Cancel' : 'Edit'}</button>
                  </HoverBorderGradient>
                </div>
              </div>
              {editing ? (
                <form onSubmit={handleProfileSave} className="grid gap-2">
                  <input className="border border-white/10 p-2 rounded bg-gray-900/60 text-gray-100" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="border border-white/10 p-2 rounded bg-gray-900/60 text-gray-100" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <div className="group inline-flex w-full">
                    <HoverBorderGradient containerClassName="rounded-md w-full" as="div" className="w-full">
                      <button className="px-3 py-1.5 w-full rounded-md bg-white text-indigo-600 font-semibold">Save</button>
                    </HoverBorderGradient>
                  </div>
                </form>
              ) : (
                <div className="text-sm text-gray-200">
                  <div><span className="text-gray-400">Name:</span> {name || '—'}</div>
                  <div><span className="text-gray-400">Email:</span> {email || '—'}</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="relative overflow-hidden isolate col-span-12 md:col-span-7 lg:col-span-8 rounded-2xl shadow-md border border-white/10 ring-1 ring-white/10 w-full">
          <GlowingEffect />
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black opacity-80" />
            <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] [background-position:center_center] opacity-60" />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-100">Your Todos</h2>
              {!loading && <span className="text-sm text-gray-300">{todos.length} items</span>}
            </div>
            <div className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2">
              {[...todos]
                .sort((a, b) => (b?.priority || 0) - (a?.priority || 0))
                .map((todo) => (
                <TodoCard key={todo.id} todo={todo} onToggle={() => handleToggle(todo)} onDelete={() => handleDelete(todo.id)} onUpdate={handleUpdate} />
              ))}
              {!loading && todos.length === 0 && (
                <p className="text-center text-gray-300">No todos yet.</p>
              )}
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden isolate rounded-xl shadow border border-white/10 ring-1 ring-white/10 p-6">
              <GlowingEffect />
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black opacity-70" />
                <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] [background-position:center_center] opacity-60" />
              </div>
              <h3 className="font-semibold text-gray-100 mb-2">Tips</h3>
              <p className="text-sm text-gray-300">Use types and priorities to organize your work. Mark tasks complete with the checkbox.</p>
            </div>
            <div className="relative overflow-hidden isolate rounded-xl shadow border border-white/10 ring-1 ring-white/10 p-6">
              <GlowingEffect />
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black opacity-70" />
                <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] [background-position:center_center] opacity-60" />
              </div>
              <h3 className="font-semibold text-gray-100 mb-2">Shortcuts</h3>
              <ul className="text-sm text-gray-300 list-disc pl-5">
                <li>Add from Home quickly</li>
                <li>Search exact titles on Home</li>
                <li>Manage everything here</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;


