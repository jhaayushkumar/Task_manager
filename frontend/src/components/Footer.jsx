const Footer = () => {
  return (
    <footer className="mt-0 w-full">
      <div className="w-full px-0">
        <div className="w-full rounded-none border-t border-indigo-100 dark:border-gray-800 bg-gradient-to-r from-black to-gray-900 text-sm text-gray-400">
          <div className="mx-auto w-full px-4 py-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-200">AI-Powered Personal Task Manager</div>
              <p className="text-xs mt-1">Add, search, and manage todos with auth, dark mode, and email alerts.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .5A11.5 11.5 0 0 0 .5 12.4c0 5.25 3.39 9.7 8.09 11.27.59.11.81-.26.81-.58 0-.29-.01-1.06-.02-2.08-3.29.73-3.99-1.6-3.99-1.6-.54-1.4-1.32-1.77-1.32-1.77-1.08-.76.08-.74.08-.74 1.2.09 1.83 1.25 1.83 1.25 1.06 1.87 2.78 1.33 3.46 1.02.11-.79.41-1.33.74-1.63-2.63-.31-5.4-1.35-5.4-6.02 0-1.33.46-2.42 1.22-3.27-.12-.31-.53-1.57.12-3.27 0 0 1-.32 3.29 1.25a11.21 11.21 0 0 1 6 0c2.29-1.57 3.29-1.25 3.29-1.25.65 1.7.24 2.96.12 3.27.76.85 1.22 1.94 1.22 3.27 0 4.69-2.78 5.7-5.43 6 .42.37.79 1.1.79 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.21.7.82.58A11.52 11.52 0 0 0 23.5 12.4 11.5 11.5 0 0 0 12 .5Z"/></svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zm.02 6H2v11h3V9.5zM14.5 9.25c-2.1 0-3 1.15-3.5 1.96V9.5H8v11h3v-6.1c0-1.61.95-2.9 2.5-2.9 1.5 0 2 1.29 2 2.9V20.5h3v-6.5c0-3.5-1.87-4.75-4-4.75z"/></svg>
              </a>
            </div>
          </div>
          <div className="mx-auto w-full px-4 pb-3 flex items-center justify-between text-xs opacity-80">
            <span>© {new Date().getFullYear()} Task Manager</span>
            <span>Built with React, Vite, Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


