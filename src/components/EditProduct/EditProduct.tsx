import { ChangeEvent, useRef, useState } from 'react';
import { ProductProps, editedProductProps } from '../../types';

// icons
import { VscChromeClose } from 'react-icons/vsc';
import { FiSave } from 'react-icons/fi';

interface EditProps {
  product: ProductProps;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
  updateProduct: (editedProduct: editedProductProps) => void;
}

export const EditProduct = ({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <>
      <td>{product.id}</td>
      <td className="product__image">
        <label htmlFor="placeholder">
          <img src={preview ? preview : product.image} alt={product.title} />
        </label>
        <input
          type="file"
          id="placeholder"
          accept="images/*"
          ref={inputRef}
          onChange={handleChange}
        />
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
          type="number"
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
