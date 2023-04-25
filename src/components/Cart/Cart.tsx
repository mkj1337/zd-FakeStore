import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useCartContext } from '../../context/CartContext';

// styles
import './Cart.scss';

// icons
import { BsArrowRight } from 'react-icons/bs';
import { CartSingle } from './CartSingle';

type CartProps = {
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Cart = ({ closeMenu }: CartProps) => {
  const { cartProducts, isOpen, setIsOpen } = useCartContext();

  if (isOpen) {
    closeMenu(false);
  }

  const cartVariants: Variants = {
    hidden: {
      opacity: 0,
      right: '-100%',
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      right: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      right: '-100%',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.section
          variants={cartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="cart"
          onClick={() => setIsOpen(false)}
        >
          <div className="cart__wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="cart__close" onClick={() => setIsOpen(false)}>
              <BsArrowRight />
            </button>
            <div className="cart__list">
              {cartProducts.length ? (
                cartProducts.map((product) => (
                  <CartSingle key={product.id} product={product} />
                ))
              ) : (
                <span>No products...</span>
              )}
            </div>
            <div className="cart__total">
              <span className="cart__total-worth">
                Total:{' '}
                {cartProducts
                  .reduce((a, c) => {
                    return a + c.quantity * c.price;
                  }, 0)
                  .toFixed(2)}
                $
              </span>
            </div>
            {cartProducts.length > 0 && (
              <div className="cart__checkout">
                <button className="cart__checkout-btn">Checkout</button>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
