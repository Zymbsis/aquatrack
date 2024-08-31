import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components';
import { Suspense } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
  return (
    <>
      <main className={css.mainContainer}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
      </main>
    </>
  );
};

export default SharedLayout;
