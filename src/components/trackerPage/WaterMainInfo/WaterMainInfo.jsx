import { useDispatch, useSelector } from 'react-redux';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';

import css from './WaterMainInfo.module.css';
import clsx from 'clsx';
import { parseDayForFetch } from '../../../helpers';
import { useEffect } from 'react';
import { getInfoByDay } from '../../../redux/water/operations';
import { selectDailyNorma } from '../../../redux/user/selectors';

const WaterMainInfo = () => {
  const dispatch = useDispatch();
  const currentDay = parseDayForFetch(new Date());
  const dailyNorma = useSelector(selectDailyNorma);

  useEffect(() => {
    if (!dailyNorma) return;
    dispatch(getInfoByDay(currentDay));
  }, [dispatch, currentDay, dailyNorma]);

  return (
    <div className={clsx(css.container, 'tour-water-main-info')}>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn className="waterMainInfoStyles" date={null} />
    </div>
  );
};

export default WaterMainInfo;
