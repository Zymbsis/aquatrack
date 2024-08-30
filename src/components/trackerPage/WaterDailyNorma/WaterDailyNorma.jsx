import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoByDay } from '../../../redux/water/operations';
import { selectDailyNorma } from '../../../redux/user/selectors';
import { parseDayForFetch } from 'helpers';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const dispatch = useDispatch();
  const dailyNorma = useSelector(selectDailyNorma);
  const formattedDailyNorma = dailyNorma
    ? Math.round((dailyNorma / 1000) * 100) / 100
    : 0;
  const currentDay = parseDayForFetch(new Date());

  useEffect(() => {
    dispatch(getInfoByDay(currentDay));
  }, [currentDay, dispatch, dailyNorma]);

  return (
    <div className={css.thumb}>
      <p className={css.boldText}>{formattedDailyNorma} L</p>
      <p className={css.normalText}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
