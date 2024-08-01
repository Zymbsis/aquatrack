import { Container, Logo, Section } from 'shared';
import { SignUpForm, AdvantagesSection } from 'components';

const SignUpPage = () => {
  return (
    <Section>
      <Container>
        <Logo />
        <SignUpForm />
        <AdvantagesSection className="signUpPage" />
      </Container>
    </Section>
  );
};

export default SignUpPage;
