import { ProductProps } from '../../types';
import { useCartContext } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// styles
import './SingleProduct.scss';

// components
import { ProductModal } from './ProductModal/ProductModal';

type SingleProductProps = {
  product: ProductProps;
};

export const SingleProduct = ({ product }: SingleProductProps) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { increaseQuantity } = useCartContext();

  useEffect(() => {
    if (isModalActive) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'unset';
    }
  }, [isModalActive]);

  const handleAdd = () => {
    increaseQuantity({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      description: product.description,
    });
    toast.success('product added to the cart!');
  };

  return (
    <>
      <ProductModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        product={product}
      />
      <div className="single__product">
        <div className="single__top" onClick={() => setIsModalActive(true)}>
          <img src={product.image} alt="" />
        </div>
        <div className="single__info">
          <h2 className="single__info-title">{product.title.slice(0, 22)}</h2>

          <div className="info__bottom">
            <span className="info__bottom-price">{product.price}$</span>
            <button className="info__bottom-btn" onClick={handleAdd}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
