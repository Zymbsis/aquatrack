import { useEffect, useRef } from 'react';
import { useModal } from 'context';
import { Modal } from 'components';
import css from './ModalBackdrop.module.css';

const ModalBackdrop = () => {
  const { modalContent, closeModal } = useModal();
  const backdropRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    const timer = setTimeout(() => {
      if (!backdropRef.current) return;
      backdropRef.current.style.opacity = 1;
    }, 0);

    return () => {
      window.removeEventListener('keydown', closeModal);
      clearTimeout(timer);
    };
  }, [closeModal]);

  return (
    <div className={css.modalBackdrop} ref={backdropRef}>
      <Modal>{modalContent}</Modal>
    </div>
  );
};

export default ModalBackdrop;
