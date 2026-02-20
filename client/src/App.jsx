import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <AppRoutes key={location.pathname} />
      </AnimatePresence>
    </div>
  );
};

export default App;
