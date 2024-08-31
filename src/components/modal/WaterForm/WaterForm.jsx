import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCurrentTime, parseDayForFetch } from 'helpers';
import { waterFormSchema } from 'validationSchemas';
import {
  addWaterIntake,
  updateWaterIntake,
} from '../../../redux/water/operations';
import { useModal } from 'context';
import { Button } from 'shared';
import WaterAmount from './WaterAmount';

import clsx from 'clsx';
import css from './WaterForm.module.css';
import { toast } from 'react-toastify';

const WaterForm = ({ type, id, date, time, volume }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentTime = getCurrentTime(new Date());
  const defaultTime = type === 'add' ? currentTime : time;
  const defaultVolume = type === 'add' ? 50 : volume;
  const currentDate = parseDayForFetch(new Date());

  const [waterAmount, setWaterAmount] = useState(defaultVolume);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(waterFormSchema),
    defaultValues: {
      timeInput: defaultTime,
      waterInput: defaultVolume,
    },
  });

  const onSubmit = (data, e) => {
    if (type === 'add') {
      const payload = {
        date: date ? date : currentDate,
        time: data.timeInput,
        volume: data.waterInput,
      };
      toast.promise(
        dispatch(addWaterIntake(payload)).unwrap(),
        {
          pending: 'Update',
          success: 'Successfully added',
          error: 'Something went wrong',
        },
        { autoClose: 3000 }
      );
    }
    if (type === 'edit') {
      const payload = {
        _id: id,
        time: data.timeInput,
        volume: data.waterInput,
      };
      toast.promise(
        dispatch(updateWaterIntake(payload)).unwrap(),
        {
          pending: 'Update',
          success: 'Successfully edited',
          error: 'Something went wrong',
        },
        { autoClose: 3000 }
      );
    }
    closeModal(e);
  };

  const handleIncrease = () => {
    if (+waterAmount >= 1000) return;
    if (+waterAmount > 950 && +waterAmount < 1000) {
      setWaterAmount(1000);
      setValue('waterInput', 1000);
      return;
    }
    setWaterAmount(+waterAmount + 50);
    setValue('waterInput', +waterAmount + 50);
  };

  const handleDecrease = () => {
    if (+waterAmount === 50) return;
    setWaterAmount(+waterAmount - 50);
    setValue('waterInput', +waterAmount - 50);
  };

  const handleWaterInputChange = e => {
    if (e.target.value.match(/^\d+$/) || e.target.value === '') {
      setWaterAmount(e.target.value);
    }
    if (+e.target.value > 1000) {
      setWaterAmount(1000);
    }
  };

  return (
    <>
      <WaterAmount
        amount={waterAmount}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label
          className={clsx(css.timeLabel, {
            [css.errorLabel]: errors.timeInput,
          })}
        >
          Recording time:
          <input
            className={css.timeInput}
            {...register('timeInput')}
            maxLength={5}
          />
        </label>
        {errors.timeInput && (
          <p className={css.errorMessage}>{errors.timeInput?.message}</p>
        )}

        <label
          className={clsx(css.waterLabel, {
            [css.errorLabel]: errors.waterInput,
          })}
        >
          Enter the value of the water used:
          <input
            className={css.waterInput}
            {...register('waterInput')}
            onChange={handleWaterInputChange}
            value={waterAmount}
            maxLength={4}
          />
        </label>
        {errors.waterInput && (
          <p className={css.errorMessage}>the minimum is 50ml</p>
        )}

        <Button className={css.saveButton} type="submit">
          Save
        </Button>
      </form>
    </>
  );
};

export default WaterForm;
