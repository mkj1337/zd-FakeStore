import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// styles
import './BackToTop.scss';

// icons
import { AiOutlineArrowUp } from 'react-icons/ai';

export const BackToTop = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const checkPosition = () => {
      window.scrollY > 170 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener('scroll', checkPosition);

    return () => window.removeEventListener('scroll', checkPosition);
  }, []);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="back__top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          <AiOutlineArrowUp />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
