export {};
// import { ProductProps, editedProductProps } from '../../types';
// import { useState } from 'react';

// // icons
// import { VscChromeClose } from 'react-icons/vsc';
// import { FiSave } from 'react-icons/fi';

// interface AddProductProps {
//   setAddIsActive: React.Dispatch<React.SetStateAction<boolean>>;
//   createProduct: () => any;
// }

// export const AddProduct = ({
//   setAddIsActive,
//   createProduct,
// }: AddProductProps) => {
//   const [addedProduct, setAddedProduct] = useState({
//     id: '',
//     image: '',
//     title: '',
//     price: '',
//     description: '',
//   });

//   const changeHandler = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setAddedProduct({ ...addedProduct, [e.target.name]: e.target.value });
//   };

//   const handleCreate = (addedProduct: editedProductProps) => {
//     if (
//       addedProduct.title.length > 0 &&
//       addedProduct.description.length > 0 &&
//       addedProduct.price > 0
//     ) {
//       createProduct(addedProduct);
//       setAddIsActive(false);
//     }
//   };

//   return (
//     <>
//       <td>{addedProduct.id}</td>
//       <td className="product__image">
//         <img src={addedProduct.image} alt={addedProduct.title} />
//       </td>
//       <td style={{ cursor: 'pointer' }}>
//         <input
//           type="text"
//           name="title"
//           value={addedProduct.title}
//           onChange={(e) => changeHandler(e)}
//           required
//         />
//       </td>
//       <td>
//         <input
//           type="text"
//           name="price"
//           value={addedProduct.price}
//           onChange={(e) => changeHandler(e)}
//           required
//         />
//       </td>
//       <td style={{ cursor: 'pointer' }}>
//         <textarea
//           name="description"
//           value={addedProduct.description}
//           onChange={(e) => changeHandler(e)}
//           required
//         ></textarea>
//       </td>
//       <td className="product__actions">
//         <button
//           className="product__actions-close"
//           onClick={() => setAddIsActive(false)}
//         >
//           <VscChromeClose />
//         </button>
//         <button
//           className="product__actions-update"
//           onClick={() => handleCreate(editedProduct)}
//         >
//           <FiSave />
//         </button>
//       </td>
//     </>
//   );
// };
