import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countUsers } from '../../../redux/user/operations';
import { selectCountUser } from '../../../redux/user/selectors';
import CustomersCounter from './CustomersCounter/CustomersCounter';
import AdvantageList from './AdvantageList/AdvantageList';

import css from './AdvantagesSection.module.css';

const AdvantagesSection = ({ className }) => {
  const dispatch = useDispatch();
  const countedUsers = useSelector(selectCountUser);

  useEffect(() => {
    if (countedUsers) return;
    dispatch(countUsers());
  }, [dispatch, countedUsers]);

  return (
    <div className={css.wrapper}>
      <CustomersCounter />
      <AdvantageList />
    </div>
  );
};

export default AdvantagesSection;
