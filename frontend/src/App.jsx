import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./context/ThemeContext";

function AppRoutes() {
  const { token } = React.useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/todos"
        element={token ? <Todos /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/contact"
        element={token ? <Contact /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={token ? "/todos" : "/login"} />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
