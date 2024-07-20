import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PrivateRoutes,
  RestrictedRoutes,
  SharedLayout,
  Loader,
} from 'components';
import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import { getUser } from './redux/user/operations.js';
import { store } from './redux/store.js';
import { selectCurrentUser } from './redux/user/selectors.js';
import { useTour } from '@reactour/tour';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast, {
  toastStyles,
} from 'components/trackerPage/CustomToast/CustomToast';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);

  // const dispatch = useDispatch();
  // const {
  //   auth: { token: accessToken },
  // } = store.getState();
  // const user = useSelector(selectCurrentUser);

  // useEffect(() => {
  //   if (!user.name && accessToken) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch]);
  const { setIsOpen } = useTour();

  const notify = () => {
    toast(<CustomToast setIsOpen={setIsOpen} />, {
      ...toastStyles,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      notify();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <SharedLayout>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoutes
                  redirectTo="/tracker"
                  component={<HomePage />}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoutes
                  redirectTo="/tracker"
                  component={<SignUpPage />}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoutes
                  redirectTo="/tracker"
                  component={<SignInPage />}
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoutes redirectTo="/" component={<TrackerPage />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SharedLayout>
      )}
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
