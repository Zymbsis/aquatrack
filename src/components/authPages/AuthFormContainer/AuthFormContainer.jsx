import clsx from 'clsx';
import css from './AuthFormContainer.module.css';

const AuthFormContainer = ({ children, className, title }) => {
  return (
    <div className={clsx(css.container, { [css[className]]: className })}>
      <div className={css.wrapper}>
        <h2 className={css.authFormTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
