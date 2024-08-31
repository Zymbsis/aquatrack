import { useDispatch } from 'react-redux';
import { Button, Title } from 'shared';
import { useModal } from 'context';
import { deleteWaterIntake } from '../../../redux/water/operations';
import css from './DeleteWaterModal.module.css';
import { toast } from 'react-toastify';

const DeleteWaterModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    toast.promise(
      dispatch(deleteWaterIntake(id)).unwrap(),
      {
        pending: 'Update',
        success: 'Successfully deleted',
        error: 'Something went wrong',
      },
      { autoClose: 2000 }
    );
    closeModal(e);
  };

  const handleCancel = e => {
    closeModal(e);
  };

  return (
    <div className={css.modalContent}>
      <Title className={css.title}>Delete entry</Title>
      <p className={css.subtitle}>Are you sure you want to delete the entry?</p>
      <div className={css.buttonWrapper}>
        <Button className={css.deleteButton} onClick={handleDelete}>
          Delete
        </Button>
        <Button className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
