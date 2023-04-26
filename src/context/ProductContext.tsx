import { useState, useEffect, createContext, useContext } from 'react';
import { ProductProps, addedProductProps, editedProductProps } from '../types';
import { toast } from 'react-toastify';
import axios from 'axios';

type ProductContextProviderProps = {
  children: React.ReactNode;
};

interface ProductContextProps {
  deleteProduct: (id: number) => void;
  createProduct: (addedProduct: addedProductProps) => void;
  updateProduct: (editedProduct: editedProductProps) => void;
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
      console.log(data);
      setProducts((prevProducts) => {
        return prevProducts.filter((prevProduct) => prevProduct.id !== id);
      });
      toast.info('Product has been deleted from the database!');
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (editedProduct: editedProductProps) => {
    try {
      const { data } = await axios.put(
        `https://fakestoreapi.com/products/${editedProduct.id}`,
        {
          editedProduct,
        }
      );
      console.log(data);
      setProducts((prevProducts) => {
        return prevProducts.map((prevProduct) => {
          if (prevProduct.id === editedProduct.id) {
            return { ...prevProduct, ...editedProduct };
          } else {
            return prevProduct;
          }
        });
      });
      toast.success('product has been updated!');
    } catch (err) {
      console.log(err);
    }
  };

  const createProduct = async (addedProduct: addedProductProps) => {
    try {
      const { data } = await axios.post(`https://fakestoreapi.com/products`, {
        addedProduct,
      });
      console.log(data);
      const highestId = products
        .map((product) => product.id)
        .sort((a, b) => b - a)[0];
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: highestId + 1, ...addedProduct },
      ]);
      toast.success('product has been added to the databese!');
    } catch (err) {
      console.log(err);
    }
  };

  const reloadProducts = () => {
    localStorage.removeItem('products');
    window.location.reload();
  };

  return (
    <ProductContext.Provider
      value={{
        deleteProduct,
        createProduct,
        updateProduct,
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
