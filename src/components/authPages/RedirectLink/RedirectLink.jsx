import { Link } from 'react-router-dom';
import GoogleBtn from '../GoogleBtn/GoogleBtn';
import css from './RedirectLink.module.css';

const RedirectLink = ({ redirect }) => {
  return (
    <>
      <GoogleBtn>
        {redirect === '/signup' ? 'Sign In' : 'Sign Up'} with Google
      </GoogleBtn>
      <div className={css.wrapper}>
        <span className={css.text}>
          {redirect === '/signup'
            ? 'Don`t have an account?'
            : 'Already have account?'}
        </span>
        <Link to={redirect} className={css.link}>
          {redirect === '/signup' ? 'Sign Up' : 'Sign In'}
        </Link>
      </div>
    </>
  );
};

export default RedirectLink;
