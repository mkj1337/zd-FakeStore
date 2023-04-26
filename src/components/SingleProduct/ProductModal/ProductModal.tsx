import { ProductProps } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '../../../context/CartContext';
import { toast } from 'react-toastify';

// styles
import './ProductModal.scss';

// icons
import { VscChromeClose } from 'react-icons/vsc';
import { GoTrashcan } from 'react-icons/go';

interface ProductModal {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductProps;
}

export const ProductModal = ({
  isModalActive,
  setIsModalActive,
  product,
}: ProductModal) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    getProductQuantity,
    removeProduct,
  } = useCartContext();

  const handleAdd = () => {
    increaseQuantity({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      description: product.description,
    });
    toast.success('product added to cart!');
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIsModalActive(false)}>
      {isModalActive && (
        <motion.section
          className="product__modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            className="product__modal-close"
            onClick={() => setIsModalActive(false)}
          >
            <VscChromeClose />
          </button>
          <div className="product__wrapper">
            <h1 className="product__title">{product.title}</h1>
            <div className="product__image">
              <img src={product.image} alt="" />
            </div>
            <div className="product__info">
              <span className="product__info-price">
                {Number(product.price).toFixed(2)}$
              </span>
              {getProductQuantity(product.id) === 0 ? (
                <button className="product__info-btn" onClick={handleAdd}>
                  ADD TO CART
                </button>
              ) : (
                <>
                  <div className="single__buttons">
                    <div
                      className="single__buttons-sub"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      -
                    </div>
                    <div className="single__buttons-quantity">
                      {getProductQuantity(product.id)}
                    </div>
                    <div
                      className="single__buttons-add"
                      onClick={() =>
                        increaseQuantity({
                          id: product.id,
                          image: product.image,
                          title: product.title,
                          price: product.price,
                          description: product.description,
                        })
                      }
                    >
                      +
                    </div>
                  </div>
                  <div
                    className="single__delete"
                    onClick={() => removeProduct(product.id)}
                  >
                    <GoTrashcan />
                  </div>
                </>
              )}
            </div>
            <div className="product__desc">
              <h2 className="product__desc-header">description</h2>
              <p className="product__desc-content">{product.description}</p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
