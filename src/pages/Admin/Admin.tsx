import { useRef, useState } from 'react';
import { ProductProps } from '../../types';
import { useProductContext } from '../../context/ProductContext';

// styles
import './Admin.scss';

// icons
import { FiRefreshCw } from 'react-icons/fi';

// components
import { TableProduct } from '../../components/TableProduct/TableProduct';

export const Admin = () => {
  const [search, setSearch] = useState<string>('');
  const [clicks, setClicks] = useState<number>(0);
  const headRef = useRef<HTMLTableSectionElement>(null);

  const { products, deleteProduct, reloadProducts, isLoading } =
    useProductContext();

  const searchProducts = (products: ProductProps[]) => {
    if (search.length) {
      return products.filter((product: any) =>
        product['title'].toLowerCase().includes(search)
      );
    }

    return products;
  };

  const sortProducts = (sortBy: string) => {
    switch (clicks) {
      case 0:
        setClicks(1);
        return products.sort((a: any, b: any) =>
          b[sortBy] < a[sortBy] ? -1 : 1
        );
      case 1:
        setClicks(0);
        return products.sort((a: any, b: any) =>
          b[sortBy] > a[sortBy] ? -1 : 1
        );
      default:
        return products;
    }
  };


  return (
    <div className="admin">
      <h1 className="admin__title">Admin Dashboard</h1>
      <button className="reload__products" onClick={reloadProducts}>
        <FiRefreshCw />
      </button>
      <input
        type="text"
        className="search__bar"
        placeholder="search by title"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <table className="product__table">
        <thead ref={headRef}>
          <tr>
            <th onClick={() => sortProducts('id')}>id</th>
            <th onClick={() => sortProducts('image')}>image</th>
            <th onClick={() => sortProducts('title')}>title</th>
            <th onClick={() => sortProducts('price')}>price</th>
            <th onClick={() => sortProducts('description')}>description</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>loading...</td>
            </tr>
          )}
          {!isLoading &&
            searchProducts(products)?.map((product) => (
              <TableProduct
                key={product.id}
                product={product}
                deleteProduct={deleteProduct}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
