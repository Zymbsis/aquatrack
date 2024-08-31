import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTour } from '@reactour/tour';
import { useSelector } from 'react-redux';
import { selectShowOnboardingTour } from '../redux/auth/selectors';
import { showOnboarding } from '../redux/auth/slice';
import { OnboardingToast } from 'components';

export const useOnboardingToast = dispatch => {
  const { setIsOpen } = useTour();
  const showTour = useSelector(selectShowOnboardingTour);

  useEffect(() => {
    if (showTour) {
      const timer = setTimeout(() => {
        toast(<OnboardingToast setIsOpen={setIsOpen} />, {
          toastId: 'show-onboarding',
          style: {
            borderRadius: 4,
            padding: 12,
          },
        });
        dispatch(showOnboarding(false));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, showTour, setIsOpen]);
};
