import { useState, useEffect, createContext, useContext } from 'react';
import { ProductProps } from '../types';
import { toast } from 'react-toastify';
import axios from 'axios';

type ProductContextProviderProps = {
  children: React.ReactNode;
};

interface ProductContextProps {
  deleteProduct: (id: number) => void;
  //   createProduct: () => ProductProps;
//   editProduct: (id: number) => void;
  reloadProducts: () => void;
  isLoading: boolean;
  products: ProductProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = useState<ProductProps[]>(() =>
    JSON.parse(localStorage.getItem('products') ?? '[]')
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.products) {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get('https://fakestoreapi.com/products');
          setIsLoading(false);
          setProducts(data);
          localStorage.setItem('products', JSON.stringify(data));
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const deleteProduct = async (id: number) => {
    try {
      const { data } = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      setProducts(products.filter((product) => product.id !== data.id));
      toast.info('Product has been deleted from the database!');
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = async (id: number) => {
    
  }

  const reloadProducts = () => {
    localStorage.removeItem('products');
    console.log('refresh the page');
  };

  return (
    <ProductContext.Provider
      value={{
        deleteProduct,
        // createProduct,
        // editProduct,
        reloadProducts,
        isLoading,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
