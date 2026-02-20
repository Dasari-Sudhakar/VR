import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3 }}
    className="mx-auto max-w-7xl p-6"
  >
    {children}
  </motion.main>
);

export default PageWrapper;
