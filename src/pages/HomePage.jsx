import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activateUser, handleGoogleSignUp } from '../redux/auth/operations';
import {
  AdvantagesSection,
  SuccessfullySendEmail,
  WelcomeSection,
} from 'components';
import { Container, Section } from 'shared';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const token = searchParams.get('token');

  useEffect(() => {
    if (code) {
      dispatch(handleGoogleSignUp(code));
    }
    if (token) {
      dispatch(activateUser(token));
    }
  }, [dispatch, code, token]);

  return (
    <Section>
      <Container>
        <WelcomeSection />
        <AdvantagesSection />
      </Container>
    </Section>
  );
};

export default HomePage;
