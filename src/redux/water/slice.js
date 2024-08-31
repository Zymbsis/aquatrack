import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getInfoByMonth,
  addWaterIntake,
  updateWaterIntake,
  deleteWaterIntake,
  getInfoByDay,
} from './operations';
import { INITIAL_STATE } from '../constants';

const waterSlice = createSlice({
  name: 'water',
  initialState: INITIAL_STATE.water,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getInfoByDay.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.selectedDate === action.payload.date) {
          state.infoBySelectedDay = action.payload.portions;
        } else {
          state.infoByToday = action.payload.portions;
        }
      })
      .addCase(getInfoByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infoByMonth = action.payload;
      })
      .addCase(addWaterIntake.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.selectedDate === action.payload.date) {
          state.infoBySelectedDay.push(action.payload);
        } else {
          state.infoByToday.push(action.payload);
        }
      })
      .addCase(updateWaterIntake.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.selectedDate) {
          state.infoBySelectedDay = state.infoBySelectedDay.map(item =>
            item._id === action.payload._id ? action.payload : item
          );
        } else {
          state.infoByToday = state.infoByToday.map(item =>
            item._id === action.payload._id ? action.payload : item
          );
        }
      })
      .addCase(deleteWaterIntake.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.selectedDate) {
          state.infoBySelectedDay = state.infoBySelectedDay.filter(
            item => item._id !== action.payload
          );
        } else {
          state.infoByToday = state.infoByToday.filter(
            item => item._id !== action.payload
          );
        }
      })
      .addMatcher(
        isAnyOf(
          getInfoByDay.pending,
          getInfoByMonth.pending,
          addWaterIntake.pending,
          updateWaterIntake.pending,
          deleteWaterIntake.pending
        ),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getInfoByDay.rejected,
          getInfoByMonth.rejected,
          addWaterIntake.rejected,
          updateWaterIntake.rejected,
          deleteWaterIntake.rejected
        ),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});
export const { setSelectedDay } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
