import { useState } from 'react';
import { ProductProps, editedProductProps } from '../../types';

// styles
import './Edit.scss';

// icons
import { VscChromeClose } from 'react-icons/vsc';
import { FiSave } from 'react-icons/fi';

interface EditProps {
  product: ProductProps;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
  updateProduct: (editedProduct: editedProductProps) => void;
}

export const EditModal = ({
  product,
  setIsEdited,
  updateProduct,
}: EditProps) => {
  const [editedProduct, setEditeProduct] = useState({
    id: product.id,
    image: product.image,
    title: product.title,
    price: product.price,
    description: product.description,
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditeProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = (editedProduct: editedProductProps) => {
    if (
      editedProduct.title.length > 0 &&
      editedProduct.description.length > 0 &&
      editedProduct.price > 0
    ) {
      updateProduct(editedProduct);
      setIsEdited(false);
    }
  };

  return (
    <>
      <td>{product.id}</td>
      <td className="product__image">
        <img src={product.image} alt={product.title} />
      </td>
      <td style={{ cursor: 'pointer' }}>
        <input
          type="text"
          name="title"
          value={editedProduct.title}
          onChange={(e) => changeHandler(e)}
          required
        />
      </td>
      <td>
        <input
          type="text"
          name="price"
          value={editedProduct.price}
          onChange={(e) => changeHandler(e)}
          required
        />
      </td>
      <td style={{ cursor: 'pointer' }}>
        <textarea
          name="description"
          value={editedProduct.description}
          onChange={(e) => changeHandler(e)}
          required
        ></textarea>
      </td>
      <td className="product__actions">
        <button
          className="product__actions-close"
          onClick={() => setIsEdited(false)}
        >
          <VscChromeClose />
        </button>
        <button
          className="product__actions-update"
          onClick={() => handleUpdate(editedProduct)}
        >
          <FiSave />
        </button>
      </td>
    </>
  );
};
