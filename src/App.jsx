import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes, RestrictedRoutes, SharedLayout } from 'components';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage'));

const App = () => {
  return (
    <>
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
                redirectTo="/activation"
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SharedLayout>
    </>
  );
};

export default App;
