import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCreatedAt } from '../../../redux/user/selectors';
import { getInfoByMonth } from '../../../redux/water/operations';
import {
  parseDayForFetch,
  parseMonthForFetch,
  parseSelectedMonth,
} from 'helpers';
import { Icon } from 'shared';
import css from './CalendarPagination.module.css';
import clsx from 'clsx';

const CalendarPagination = ({
  selectedDate,
  setSelectedDate,
  showStatistics,
  handleClick,
}) => {
  const dispatch = useDispatch();

  const userCreatedAt = useSelector(selectUserCreatedAt);
  const userCreatedDate = userCreatedAt ? new Date(userCreatedAt) : new Date();
  const limitDate = new Date();
  const currentDay = parseDayForFetch(new Date());
  limitDate.setFullYear(limitDate.getFullYear() + 1);

  const hasPrevMonth =
    selectedDate.getFullYear() < userCreatedDate.getFullYear() ||
    (selectedDate.getFullYear() === userCreatedDate.getFullYear() &&
      selectedDate.getMonth() <= userCreatedDate.getMonth());

  const hasNextMonth =
    selectedDate.getFullYear() > limitDate.getFullYear() ||
    (selectedDate.getFullYear() === limitDate.getFullYear() &&
      selectedDate.getMonth() >= limitDate.getMonth());

  useEffect(() => {
    const dateForFetch = parseMonthForFetch(selectedDate, currentDay);
    dispatch(getInfoByMonth(dateForFetch));
  }, [selectedDate, currentDay, dispatch]);

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => {
      const prevMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonthDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate(nextDate => {
      const nextMonthDate = new Date(
        nextDate.getFullYear(),
        nextDate.getMonth() + 1,
        1
      );
      return nextMonthDate;
    });
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>{showStatistics ? 'Statistics' : 'Month'}</h2>
      <div className={css.buttonWrapper}>
        <div className={css.dateBox}>
          <button
            className={clsx(css.iconBtn, css.iconBtnLeft)}
            onClick={handlePrevMonth}
            disabled={hasPrevMonth}
          >
            <Icon iconId="icon-chevron-down" className={css.icon} />
          </button>
          <p className={css.date}>{parseSelectedMonth(selectedDate)}</p>
          <button
            className={clsx(css.iconBtn, css.iconBtnRight)}
            onClick={handleNextMonth}
            disabled={hasNextMonth}
          >
            <Icon iconId="icon-chevron-down" className={css.icon} />
          </button>
        </div>

        <button className={css.statisticsBtn} onClick={handleClick}>
          <Icon
            iconId="icon-pie-chart-02"
            className={clsx(css.statisticsIcon, {
              [css.statisticsIconActive]: showStatistics,
            })}
          />
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
