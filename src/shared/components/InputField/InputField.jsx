import clsx from 'clsx';
import css from './InputField.module.css';

const InputField = ({
  label,
  fieldName,
  children,
  errors,
  errorMessage,
  register,
  ...props
}) => {
  return (
    <label className={clsx(css.label, { [css.errorLabel]: errors[fieldName] })}>
      {label
        ? label
        : fieldName.replace(fieldName[0], fieldName[0].toUpperCase())}
      <input
        className={clsx(css.input, { [css.errorInput]: errors[fieldName] })}
        {...register(fieldName)}
        {...props}
      />
      {children}
      <span className={css.errorMessage}>{errors[fieldName]?.message}</span>
    </label>
  );
};

export default InputField;
