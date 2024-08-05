import { Icon } from 'shared';
import css from './ShowPasswordBtn.module.css';

const ShowPasswordBtn = ({ onClick, showPassword }) => {
  return (
    <button className={css.showPasswordBtn} type="button" onClick={onClick}>
      {showPassword ? (
        <Icon className={css.icon} iconId="icon-eye-off" />
      ) : (
        <Icon className={css.icon} iconId="icon-eye" />
      )}
    </button>
  );
};

export default ShowPasswordBtn;
