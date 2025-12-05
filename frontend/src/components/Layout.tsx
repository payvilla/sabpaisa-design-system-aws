import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg
                           border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-2xl font-bold gradient-text">Developer Library</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy, paste, and build amazing experiences
              </p>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200
                         dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>

        {/* Footer with Copyright */}
        <footer className="border-t border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/brand/logos/Asset 2.svg"
                alt="SabPaisa"
                className="h-6 w-auto"
              />
              <span className="text-xs text-gray-300">Product Design Engine</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">
                © {new Date().getFullYear()} SabPaisa. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Designed & Built for Developers
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
