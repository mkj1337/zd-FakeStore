// styles
import { useState } from 'react';
import './EditModal.scss';

// icons
import { VscChromeClose } from 'react-icons/vsc';

interface EditModalProps {
  productId: number;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModal = ({ productId, setIsEdited }: EditModalProps) => {
  const [editedProduct, setEditeProduct] = useState({});

  return (
    <div className="edit-modal">
      <div className="edit-modal-wrapper">
        <div className="modal-top">
          <h2 className="modal-title">Edit Modal</h2>
          <div className="modal-close">
            <VscChromeClose />
          </div>
        </div>
      </div>
    </div>
  );
};
