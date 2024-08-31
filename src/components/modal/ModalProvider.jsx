import { useState } from 'react';
import { createPortal } from 'react-dom';
import { modalContext } from 'context';
import ModalBackdrop from './ModalBackdrop/ModalBackdrop';

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const openModal = content => {
    document.body.style.overflow = 'hidden';
    setModalContent(content);
  };

  const closeModal = e => {
    if (
      e.target === e.currentTarget ||
      e.code === 'Escape' ||
      e.type === 'submit'
    ) {
      document.body.style.overflow = 'visible';
      setModalContent(null);
    }
  };

  return (
    <modalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
      {modalContent &&
        createPortal(<ModalBackdrop />, document.querySelector('#modal-root'))}
    </modalContext.Provider>
  );
};

export default ModalProvider;
