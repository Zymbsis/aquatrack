import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';
import { selectCompletionRate } from '../../../redux/water/selectors.js';
import css from './WaterProgressBar.module.css';

const WaterProgressBar = () => {
  const completionRate = useSelector(selectCompletionRate);

  const invisibleMarkWater = [0, 50, 100];
  const marks = [
    {
      value: completionRate,
      label: `${completionRate}%`,
    },
  ];

  return (
    <div className={css.thumb}>
      <p className={css.boldText}>Today</p>
      <Slider
        className={css.slider}
        value={completionRate}
        marks={marks}
        sx={{
          '& .MuiSlider-markLabel': {
            visibility: invisibleMarkWater.includes(completionRate)
              ? 'hidden'
              : 'visible',
          },
        }}
      />
      <ul className={css.scale}>
        <li className={css.normalText}>0%</li>
        <li className={css.normalText}>50%</li>
        <li className={css.normalText}>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
