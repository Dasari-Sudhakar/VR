import { Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 p-4 backdrop-blur-md dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-cyan-400">
          Immersive VR Tour
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="rounded-full p-2 glass" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="rounded-xl px-3 py-2 glass">Dashboard</Link>}
              <button
                className="rounded-xl px-3 py-2 glass"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-xl px-3 py-2 glass">Login</Link>
              <Link to="/signup" className="rounded-xl bg-cyan-500 px-3 py-2 text-slate-950">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
