import { Container, Logo, Section } from 'shared';
import { AdvantagesSection, SignUpSection } from 'components';
import { useWindowSize } from 'helpers';

const SignUpPage = () => {
  const windowSize = useWindowSize();

  return (
    <Section>
      <Container>
        <Logo />
        <SignUpSection />
        {windowSize >= 1440 && <AdvantagesSection />}
      </Container>
    </Section>
  );
};

export default SignUpPage;
