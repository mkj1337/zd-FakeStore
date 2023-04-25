import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// styles
import './Store.scss';

export const Store = () => {
  const search = useLocation().search;
  const category = new URLSearchParams(search).get('category');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (category) {
          const { data } = await axios.get(
            'https://fakestoreapi.com/products/category/jewelery'
          );
          setProducts(data);
        } else {
          const { data } = await axios.get('https://fakestoreapi.com/products');
          setProducts(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  console.log(products);
  return <div>Store</div>;
};
