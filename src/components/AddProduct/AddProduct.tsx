import { addedProductProps } from '../../types';
import { ChangeEvent, useRef, useState } from 'react';

// icons
import { VscChromeClose } from 'react-icons/vsc';
import { FiSave } from 'react-icons/fi';

interface AddProductProps {
  setIsAddActive: React.Dispatch<React.SetStateAction<boolean>>;
  createProduct: (addedProduct: addedProductProps) => void;
}

export const AddProduct = ({
  setIsAddActive,
  createProduct,
}: AddProductProps) => {
  const [addedProduct, setAddedProduct] = useState({
    image: 'https://placehold.co/300x500',
    title: '',
    price: 0,
    description: '',
    category: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddedProduct({ ...addedProduct, [e.target.name]: e.target.value });
  };

  const handleCreate = (addedProduct: addedProductProps) => {
    if (
      addedProduct.title.length > 0 &&
      addedProduct.description.length > 0 &&
      addedProduct.price > 0
    ) {
      createProduct(addedProduct);
      setIsAddActive(false);
    } else {
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
    <tr>
      <td>#</td>
      <td className="product__image">
        <label htmlFor="placeholder">
          <img
            src={preview ? preview : 'https://placehold.co/600x400'}
            alt={addedProduct.title}
          />
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
          value={addedProduct.title}
          onChange={(e) => changeHandler(e)}
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="price"
          value={addedProduct.price}
          onChange={(e) => changeHandler(e)}
          required
        />
      </td>
      <td style={{ cursor: 'pointer' }}>
        <textarea
          name="description"
          value={addedProduct.description}
          onChange={(e) => changeHandler(e)}
          required
        ></textarea>
      </td>
      <td className="product__actions">
        <button
          className="product__actions-close"
          onClick={() => setIsAddActive(false)}
        >
          <VscChromeClose />
        </button>
        <button
          className="product__actions-update"
          onClick={() => handleCreate(addedProduct)}
        >
          <FiSave />
        </button>
      </td>
    </tr>
  );
};
