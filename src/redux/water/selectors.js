import { createSelector } from '@reduxjs/toolkit';
import { selectDailyNorma } from '../user/selectors';

export const selectInfoByToday = state => state.water.infoByToday;
export const selectInfoBySelectedDay = state => state.water.infoBySelectedDay;
export const selectInfoByMonth = state => state.water.infoByMonth;
export const selectSelectedDate = state => state.water.selectedDate;
export const selectIsError = state => state.water.isError;
export const selectIsLoading = state => state.water.isLoading;

export const selectCompletionRate = createSelector(
  [selectInfoByToday, selectDailyNorma],
  (portions, norma) => {
    if (!norma || !portions.length) {
      return 0;
    }
    const totalVolume = portions.reduce((acc, item) => acc + item.volume, 0);
    const completionRate = Math.round((totalVolume * 100) / norma);
    return completionRate;
  }
);
