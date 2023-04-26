import React, { useState } from 'react';
import { EditProduct } from '../EditProduct/EditProduct';
import { ProductProps, editedProductProps } from '../../types';

// styles
import './TableProduct.scss';

// icons
import { AiOutlineEdit } from 'react-icons/ai';
import { GoTrashcan } from 'react-icons/go';

type TableProductProps = {
  product: ProductProps;
  setAddIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isAddActive: boolean;
  deleteProduct: (id: number) => void;
  updateProduct: (editedProduct: editedProductProps) => void;
};

export const TableProduct = ({
  product,
  deleteProduct,
  updateProduct,
}: TableProductProps) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [expandDesc, setExpandDesc] = useState<boolean>(false);
  const [expandTitle, setExpandTitle] = useState<boolean>(false);

  return (
    <>
      {isEdited ? (
        <tr className="table__product">
          <EditProduct
            product={product}
            setIsEdited={setIsEdited}
            updateProduct={updateProduct}
          />
        </tr>
      ) : (
        <tr className="table__product">
          <td>{product.id}</td>
          <td className="product__image">
            <img src={product.image} alt={product.title} />
          </td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => setExpandTitle(!expandTitle)}
          >
            {!expandTitle ? `${product.title.slice(0, 30)}...` : product.title}
          </td>
          <td>{Number(product.price).toFixed(2)}$</td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => setExpandDesc(!expandDesc)}
          >
            {!expandDesc
              ? `${product.description.slice(0, 30)}...`
              : product.description}
          </td>
          <td className="product__actions">
            <button
              className="product__actions-edit"
              onClick={() => setIsEdited(true)}
            >
              <AiOutlineEdit />
            </button>
            <button
              className="product__actions-delete"
              onClick={() => deleteProduct(product.id)}
            >
              <GoTrashcan />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
