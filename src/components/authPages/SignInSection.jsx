import AuthFormContainer from './AuthFormContainer/AuthFormContainer';
import SignInForm from './AuthForms/SignInForm';
import RedirectLink from './RedirectLink/RedirectLink';

const SignInSection = () => {
  return (
    <AuthFormContainer title="Sign In">
      <SignInForm />
      <RedirectLink redirect={'/signup'} />
    </AuthFormContainer>
  );
};

export default SignInSection;
