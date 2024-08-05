import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { logIn } from '../../../redux/auth/operations';
import { signInFormSchema } from 'validationSchemas';
import { Button, InputField } from 'shared';
import ShowPasswordBtn from '../ShowPasswordBtn/ShowPasswordBtn';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = data => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();
    dispatch(logIn({ email: newEmail, password }));
    reset();
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
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SignInForm;
