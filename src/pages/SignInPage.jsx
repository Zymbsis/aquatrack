import { Container, Section, Logo } from 'shared';
import { SignInForm, AdvantagesSection } from 'components';

const SignInPage = () => {
  return (
    <Section>
      <Container>
        <Logo />
        <SignInForm />
        <AdvantagesSection className="signInPage" />
      </Container>
    </Section>
  );
};

export default SignInPage;
