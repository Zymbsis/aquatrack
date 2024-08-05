import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useModal } from 'context';
import { yupResolver } from '@hookform/resolvers/yup';
import { register as registerUser } from '../../../redux/auth/operations';
import { signUpFormSchema } from 'validationSchemas';
import { Button, InputField } from 'shared';
import SuccessfullySendEmail from '../../modal/SuccessfullySendEmail/SuccessfullySendEmail';
import ShowPasswordBtn from '../ShowPasswordBtn/ShowPasswordBtn';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = data => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();
    dispatch(registerUser({ email: newEmail, password }));
    openModal(<SuccessfullySendEmail email={email} />);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        fieldName="email"
        register={register}
        errors={errors}
        placeholder="Enter your email"
        type="text"
      />
      <InputField
        fieldName="password"
        register={register}
        errors={errors}
        placeholder="Enter your password"
        type={showPassword ? 'text' : 'password'}
      >
        <ShowPasswordBtn
          onClick={handleClickShowPassword}
          showPassword={showPassword}
        />
      </InputField>
      <InputField
        label="Repeat password"
        fieldName="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Repeat password"
        type={showPassword ? 'text' : 'password'}
      >
        <ShowPasswordBtn
          onClick={handleClickShowPassword}
          showPassword={showPassword}
        />
      </InputField>
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
