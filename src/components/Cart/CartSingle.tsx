import { useCartContext } from '../../context/CartContext';
import { ProductProps } from '../../types';
import { useState } from 'react';

// styles
import './Cart.scss';

// icons
import { GoTrashcan } from 'react-icons/go';

// components
import { ProductModal } from '../SingleProduct/ProductModal/ProductModal';

type SingleProductProps = {
  product: ProductProps;
};

export const CartSingle = ({ product }: SingleProductProps) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const {
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    getProductQuantity,
  } = useCartContext();


  return (
    <>
      <ProductModal
        product={product}
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
      />
      <div className="cart__single">
        <div className="single__left" onClick={() => setIsModalActive(true)}>
          <div className="single__image">
            <img src={product.image} alt="" />
          </div>
          <div className="single__info">
            <span className="single__info-title">
              {product.title.slice(0, 20)}
            </span>
            <div className="single__info-price">
              {Number(product.price).toFixed(2)}$ x {getProductQuantity(product.id)} ={' '}
              {(product.price * getProductQuantity(product.id)).toFixed(2)}$
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
};
