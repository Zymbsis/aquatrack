import { useModal } from 'context';
import { Button, Title } from 'shared';
import css from './SuccessfullySendEmail.module.css';

const SuccessfullySendEmail = ({ email }) => {
  const { closeModal } = useModal();

  return (
    <div className={css.wrapper}>
      <Title className={css.title}>Email Verification</Title>
      <p className={css.text}>
        Please verify your email address by clicking the link sent to:{' '}
        <a href={email}>{email}</a>
      </p>
      <Button className={css.closeBtn} onClick={closeModal}>
        Close window
      </Button>
    </div>
  );
};

export default SuccessfullySendEmail;
