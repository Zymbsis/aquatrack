import { useSelector } from 'react-redux';
import { selectDailyNorma } from '../../../redux/user/selectors';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectDailyNorma);
  const formattedDailyNorma = dailyNorma
    ? Math.round((dailyNorma / 1000) * 100) / 100
    : 0;

  return (
    <div className={css.thumb}>
      <p className={css.boldText}>{formattedDailyNorma} L</p>
      <p className={css.normalText}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
