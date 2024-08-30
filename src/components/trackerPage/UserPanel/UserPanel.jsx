import css from './UserPanel.module.css';
import React from 'react';
import UserBar from '../UserBar/UserBar';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/user/selectors';

const UserPanel = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={css.userPanel}>
      <h2 className={css.helloTitle}>
        Hello, <span className={css.userNameHello}>{userName}!</span>
      </h2>
      <UserBar />
    </div>
  );
};
export default UserPanel;
