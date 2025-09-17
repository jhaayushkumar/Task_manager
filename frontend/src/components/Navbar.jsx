import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { HoverBorderGradient } from "../components/ui/HoverBorderGradient";

const Navbar = () => {
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-black border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to={token ? "/todos" : "/login"} className="font-bold text-lg text-gray-100">Task Manager</Link>
          {token && (
            <>
              <Link to="/todos" className="text-sm text-gray-300 hover:text-white">Home</Link>
              <Link to="/profile" className="text-sm text-gray-300 hover:text-white">Profile</Link>
              <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link>
            </>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {token && (
            <div className="group inline-flex">
              <HoverBorderGradient containerClassName="rounded-md" as="div">
                <button onClick={handleLogout} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-500">Logout</button>
              </HoverBorderGradient>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


