import { Button } from 'shared';
import css from './OnboardingToast.module.css';

const OnboardingToast = ({ setIsOpen }) => (
  <div className={css.wrapper}>
    <p className={css.text}>
      Welcome to our website! Do you want to learn how to use our site quickly?
      Take a brief onboarding course.
    </p>
    <Button onClick={() => setIsOpen(true)} className={css.btn}>
      Start Course
    </Button>
  </div>
);

export default OnboardingToast;
