import { Container, Logo, Section } from 'shared';
import { WaterDetailedInfo, WaterMainInfo } from 'components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../redux/user/operations';
import { useOnboardingToast } from '../helpers/useOnboardingToast';

const TrackerPage = () => {
  useOnboardingToast();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Section>
      <Container>
        <Logo />
        <WaterMainInfo />
        <WaterDetailedInfo />
      </Container>
    </Section>
  );
};

export default TrackerPage;
