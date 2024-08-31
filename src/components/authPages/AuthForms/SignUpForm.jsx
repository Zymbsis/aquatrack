import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { register as registerUser } from '../../../redux/auth/operations';
import { signUpFormSchema } from 'validationSchemas';
import { Button, InputField } from 'shared';
import ShowPasswordBtn from '../ShowPasswordBtn/ShowPasswordBtn';
import { selectIsSendMail } from '../../../redux/auth/selectors';
import { useModal } from '../../../context';
import { SuccessfullySendEmail } from '../..';
import toast from 'react-hot-toast';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const isSendMail = useSelector(selectIsSendMail);

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
      toast.error(<b>{error.data.message}</b>);
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
