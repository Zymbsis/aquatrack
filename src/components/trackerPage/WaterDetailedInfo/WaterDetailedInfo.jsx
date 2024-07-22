import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/user/operations';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';
import css from './WaterDetailedInfo.module.css';

import StatisticSection from 'components/trackerPage/StatisticSection/StatisticSection';

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <UserPanel />
      <DailyInfo />
      {/* <MonthInfo /> */}
      <StatisticSection />
    </div>
  );
};

export default WaterDetailedInfo;
