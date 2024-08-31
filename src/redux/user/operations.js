import { createAsyncThunk } from '@reduxjs/toolkit';
import { AXIOS_INSTANCE } from '../constants';
import { toast } from 'react-toastify';
import { getInfoByMonth } from '../water/operations';

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await AXIOS_INSTANCE.get('/users/current');

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await AXIOS_INSTANCE.patch('/users/update', payload);
      if (payload.dailyNorma) {
        thunkAPI.dispatch(getInfoByMonth());
      }
      return data;
    } catch (error) {
      toast.error(<b>{error.data.message}</b>);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const countUsers = createAsyncThunk(
  'user/countUsers',
  async (_, thunkAPI) => {
    try {
      const {
        data: {
          data: { count },
        },
      } = await AXIOS_INSTANCE.get('/users/count');
      return count;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
