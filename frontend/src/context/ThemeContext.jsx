import { createContext } from "react";

export const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
    try { localStorage.setItem('theme','dark'); } catch {}
  }
  return children;
};


