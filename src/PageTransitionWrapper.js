import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95, // Leggero zoom out all'inizio
    y: 10,
  },
  in: {
    opacity: 1,
    scale: 1, // Zoom in allo stato finale
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.17, 0.67, 0.83, 0.67] // Curva di animazione fluida
    }
  },
  out: {
    opacity: 0,
    scale: 1.05, // Leggero zoom out durante l'uscita
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.17, 0.67, 0.83, 0.67]
    }
  }
};

function PageTransitionWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      style={{ width: '100%', minHeight: '80vh' }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransitionWrapper;