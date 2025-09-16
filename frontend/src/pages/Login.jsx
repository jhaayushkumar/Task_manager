import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { SparklesCore } from "../components/ui/SparklesCore";

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInput = ({ id, label, type = "text", value, onChange, placeholder }) => (
  <div className="flex w-full flex-col space-y-2 mb-4">
    <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-600/30"
    />
  </div>
);

const Login = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      setToken(token);
      setUser(user);
      setMessage("Login successfully");
      setError("");
      setTimeout(() => navigate("/todos"), 800);
    } catch (err) {
      setError("Login failed");
      setMessage("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 -z-10">
        <SparklesCore id="login-sparkles" background="transparent" particleDensity={120} particleColor="#ffffff" className="w-full h-full" />
      </div>
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border border-neutral-200 dark:border-neutral-800 relative">
        <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">Welcome back</h1>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center mx-auto">
          Login to continue managing your tasks.
        </p>
        {(message || error) && (
          <div className={`mt-3 mb-2 p-2 rounded text-center ${message ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message || error}
          </div>
        )}
        <form className="my-6" onSubmit={handleLogin}>
          <LabelInput
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <LabelInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Login →
            <BottomGradient />
          </button>
        </form>
        <p className="text-sm mt-2 text-center text-neutral-700 dark:text-neutral-300">
          Don't have an account?{" "}
          <Link className="text-indigo-600 dark:text-indigo-400" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
