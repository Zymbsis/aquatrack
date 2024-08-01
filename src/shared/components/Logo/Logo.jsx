import css from './Logo.module.css';
import clsx from 'clsx';

const Logo = ({ className }) => {
  return (
    <a
      href="/aquatrack"
      className={clsx(css.logo, { [className]: className }, 'tour-logo')}
    >
      AquaTrack
    </a>
  );
};

export default Logo;
