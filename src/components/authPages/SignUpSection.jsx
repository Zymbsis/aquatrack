import AuthFormContainer from './AuthFormContainer/AuthFormContainer';
import SignUpForm from './AuthForms/SignUpForm';
import RedirectLink from './RedirectLink/RedirectLink';

const SignUpSection = () => {
  return (
    <AuthFormContainer title="Sign Up" className="signUp">
      <SignUpForm />
      <RedirectLink redirect={'/signin'} />
    </AuthFormContainer>
  );
};

export default SignUpSection;
