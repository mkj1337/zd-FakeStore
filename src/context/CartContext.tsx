import { useState, useContext, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useProductContext } from './ProductContext';

type CartContextProviderProps = {
  children: React.ReactNode;
};

interface increaseQuantityProps {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface CartProduct {
  id: number;
  quantity: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface CardContextProps {
  increaseQuantity: ({
    id,
    image,
    title,
    price,
    description,
  }: increaseQuantityProps) => void;
  decreaseQuantity: (id: number) => void;
  removeProduct: (id: number) => void;
  getProductQuantity: (id: number) => number;
  cartQuantity: number;
  cartProducts: CartProduct[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext({} as CardContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(
    localStorage.getItem('cartProducts')
      ? JSON.parse(String(localStorage.getItem('cartProducts')))
      : []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { products } = useProductContext();

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => quantity + product.quantity,
    0
  );

  const getProductQuantity = (id: number) => {
    return cartProducts.find((product) => product.id === id)?.quantity || 0;
  };

  const increaseQuantity = ({
    id,
    image,
    title,
    description,
    price,
  }: increaseQuantityProps) => {
    setCartProducts((prevProducts) => {
      if (prevProducts.find((product) => product.id === id) == null) {
        return [
          ...prevProducts,
          { id, image, title, description, price, quantity: 1 },
        ];
      } else {
        return prevProducts.map((prevProduct) => {
          if (prevProduct.id === id) {
            return { ...prevProduct, quantity: prevProduct.quantity + 1 };
          } else {
            return prevProduct;
          }
        });
      }
    });
  };

  const decreaseQuantity = (id: number) => {
    setCartProducts((prevProducts) => {
      if (prevProducts.find((product) => product.id === id)?.quantity === 1) {
        return prevProducts.filter((prevProduct) => prevProduct.id !== id);
      } else {
        return prevProducts.map((prevProduct) => {
          if (prevProduct.id === id) {
            return { ...prevProduct, quantity: prevProduct.quantity - 1 };
          } else {
            return prevProduct;
          }
        });
      }
    });
  };

  const removeProduct = (id: number) => {
    setCartProducts((prevProducts) => {
      return prevProducts.filter((prevProduct) => {
        return prevProduct.id !== id;
      });
    });
    toast.info('product has been removed from the cart successfully!');
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const p = products.map((product) => product.id);
    setCartProducts((prevProducts) => {
      return prevProducts.filter((prevProduct) => {
        return p.includes(prevProduct.id);
      });
    });
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        cartQuantity,
        getProductQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeProduct,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
