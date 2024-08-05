import { Container, Section, Logo } from 'shared';
import { AdvantagesSection, SignInSection } from 'components';
import { useWindowSize } from 'helpers';

const SignInPage = () => {
  const windowSize = useWindowSize();

  return (
    <Section>
      <Container>
        <Logo />
        <SignInSection />
        {windowSize >= 1440 && <AdvantagesSection />}
      </Container>
    </Section>
  );
};

export default SignInPage;
