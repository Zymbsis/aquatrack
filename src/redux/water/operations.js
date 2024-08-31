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
  async (_, { rejectWithValue, getState }) => {
    const selectedDate = getState().water.selectedDate;
    const currentDay = parseDayForFetch(new Date());
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.get(
        `/water/month/${
          selectedDate
            ? selectedDate.substring(0, 7)
            : currentDay.substring(0, 7)
        }`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
  // Example: getInfoByMonth('2024-07')
);

export const addWaterIntake = createAsyncThunk(
  'water/addWaterIntake',
  async (waterData, { rejectWithValue, dispatch }) => {
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.post('/water', waterData);
      dispatch(getInfoByMonth());
      return data;
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
  async ({ _id, ...waterData }, { rejectWithValue, dispatch }) => {
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.patch(`/water/${_id}`, {
        ...waterData,
      });
      dispatch(getInfoByMonth());
      return data;
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
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      await AXIOS_INSTANCE.delete(`/water/${_id}`);
      dispatch(getInfoByMonth());
      return _id;
    } catch (error) {
      error.data.message === 'Bad Request'
        ? toast.error(<b>{'Something went wrong. Please, try again'}</b>)
        : toast.error(<b>{error.data.message}</b>);
      return rejectWithValue(error);
    }
  }
  // Example: deleteWaterIntake('669659783a9e3788a6f21a13')
);
