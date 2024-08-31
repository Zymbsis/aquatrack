import { Container, Logo, Section } from 'shared';
import { AdvantagesSection, SignUpSection } from 'components';
import { useWindowSize } from 'helpers';
import { useSelector } from 'react-redux';
import { selectIsSendMail } from '../redux/auth/selectors';

const SignUpPage = () => {
  const windowSize = useWindowSize();
  const isSendMail = useSelector(selectIsSendMail);
  console.log(isSendMail);
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
