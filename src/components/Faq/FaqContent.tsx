import { motion, AnimatePresence } from 'framer-motion';

// icons
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type FaqContentProps = {
  index: number;
  isActiveFaq: number | null;
  setIsActiveFaq: React.Dispatch<React.SetStateAction<number | null>>;
  content: string;
  title: string;
};

export const FaqContent = ({
  index,
  isActiveFaq,
  setIsActiveFaq,
  title,
  content,
}: FaqContentProps) => {
  const handleActive = () => {
    setIsActiveFaq(isActiveFaq === index ? null : index);
  };

  return (
    <>
      <div className="faq__single">
        <div className="faq__single-top" onClick={handleActive}>
          <h3 className="faq__single-title">{title}</h3>
          <div className="faq__single-btn">
            {isActiveFaq === index ? (
              <IoIosArrowUp className="faq__single-icon" />
            ) : (
              <IoIosArrowDown className="faq__single-icon" />
            )}
          </div>
        </div>
        <AnimatePresence
          mode="wait"
        >
          {isActiveFaq === index && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="faq__single-content"
            >
              {content}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
