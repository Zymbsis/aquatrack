import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { register as registerUser } from '../../../redux/auth/operations';
import { signUpFormSchema } from 'validationSchemas';
import { Button, InputField } from 'shared';
import ShowPasswordBtn from '../ShowPasswordBtn/ShowPasswordBtn';
import { useModal } from '../../../context';
import { SuccessfullySendEmail } from '../..';
import { toast } from 'react-toastify';

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

  const onSubmit = async data => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();
    try {
      await dispatch(registerUser({ email: newEmail, password })).unwrap();
      openModal(<SuccessfullySendEmail email={email} />);
    } catch (error) {
      toast.error(error.data.message, { toastId: error.data.message });
    }
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
