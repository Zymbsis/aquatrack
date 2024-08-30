import { createAsyncThunk } from '@reduxjs/toolkit';
import { AXIOS_INSTANCE } from '../constants';
import { parseDayForFetch } from 'helpers';
import toast from 'react-hot-toast';

export const getInfoByDay = createAsyncThunk(
  'water/getInfoByDay',
  async (date, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
  // Example: getInfoByDay('2024-07-02')
);

export const getInfoByMonth = createAsyncThunk(
  'water/getInfoByMonth',
  async (month, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS_INSTANCE.get(`/water/month/${month}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
  // Example: getInfoByMonth('2024-07')
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (waterData, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.post('/water', waterData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  // Example: addWaterIntake({
  //   time: "09:00:05",
  //   date: "2024-07-01",
  //   volume: 150
  // })
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({ _id, ...waterData }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.patch(`/water/${_id}`, {
        ...waterData,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  //Example: updateWaterIntake({
  //  _id: '669657233a9e3788a6f219b0',
  //  time: '10:30:00',
  //  volume: 50,
  // })
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (_id, thunkAPI) => {
    try {
      await AXIOS_INSTANCE.delete(`/water/${_id}`);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  // Example: deleteWaterIntake('669659783a9e3788a6f21a13')
);

export const addWaterIntake = createAsyncThunk(
  'water/addWaterIntake',
  async (waterData, { rejectWithValue, getState, dispatch }) => {
    const selectedDate = getState().water.selectedDate;
    const currentDay = parseDayForFetch(new Date());
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.post('/water', waterData);
      const { payload: infoByMonth } = await dispatch(
        getInfoByMonth(
          selectedDate
            ? selectedDate.substring(0, 7)
            : currentDay.substring(0, 7)
        )
      );
      let infoByToday;
      if (waterData.date === currentDay) {
        const { payload } = await dispatch(getInfoByDay(currentDay));
        infoByToday = payload;
      }
      return { data, infoByMonth, infoByToday };
    } catch (error) {
      error.data.message === 'Bad Request'
        ? toast.error(<b>{'Something went wrong. Please, try again'}</b>)
        : toast.error(<b>{error.data.message}</b>);
      return rejectWithValue(error);
    }
  }
  // Example: addWaterIntake({
  //   time: "09:00:05",
  //   date: "2024-07-01",
  //   volume: 150
  // })
);

export const updateWaterIntake = createAsyncThunk(
  'water/updateWaterIntake',
  async ({ _id, ...waterData }, { rejectWithValue, getState, dispatch }) => {
    const selectedDate = getState().water.selectedDate;
    const currentDay = parseDayForFetch(new Date());
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.patch(`/water/${_id}`, {
        ...waterData,
      });
      const { payload: infoByMonth } = await dispatch(
        getInfoByMonth(
          selectedDate
            ? selectedDate.substring(0, 7)
            : currentDay.substring(0, 7)
        )
      );
      let infoByToday;
      if (selectedDate === null) {
        const { payload } = await dispatch(getInfoByDay(currentDay));
        infoByToday = payload;
      }
      return { data, infoByMonth, infoByToday };
    } catch (error) {
      error.data.message === 'Bad Request'
        ? toast.error(<b>{'Something went wrong. Please, try again'}</b>)
        : toast.error(<b>{error.data.message}</b>);
      return rejectWithValue(error);
    }
  }
  //Example: updateWaterIntake({
  //  _id: '669657233a9e3788a6f219b0',
  //  time: '10:30:00',
  //  volume: 50,
  // })
);

export const deleteWaterIntake = createAsyncThunk(
  'water/deleteWaterIntake',
  async (_id, { rejectWithValue, getState, dispatch }) => {
    const selectedDate = getState().water.selectedDate;
    const currentDay = parseDayForFetch(new Date());
    try {
      await AXIOS_INSTANCE.delete(`/water/${_id}`);
      const {
        data: { data: infoByDay },
      } = await AXIOS_INSTANCE.get(
        `/water/day/${selectedDate ? selectedDate : currentDay}`
      );
      const { payload: infoByMonth } = await dispatch(
        getInfoByMonth(
          selectedDate
            ? selectedDate.substring(0, 7)
            : currentDay.substring(0, 7)
        )
      );
      return { infoByDay, infoByMonth };
    } catch (error) {
      error.data.message === 'Bad Request'
        ? toast.error(<b>{'Something went wrong. Please, try again'}</b>)
        : toast.error(<b>{error.data.message}</b>);
      return rejectWithValue(error);
    }
  }
  // Example: deleteWaterIntake('669659783a9e3788a6f21a13')
);
