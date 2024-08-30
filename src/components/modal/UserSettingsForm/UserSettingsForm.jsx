import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'context';
import { updateUser } from '../../../redux/user/operations.js';
import {
  selectCurrentUser,
  selectIsError,
} from '../../../redux/user/selectors.js';
import { userSettingsFormSchema } from 'validationSchemas';
import { Button } from 'shared/index.js';
import UserSettingsFormAvatar from './UserSettingsFormAvatar.jsx';
import UserSettingsFormFirstColumn from './UserSettingsFormFirstColumn.jsx';
import UserSettingsFormSecondColumn from './UserSettingsFormSecondColumn.jsx';

import css from './UserSettingsForm.module.css';

const UserSettingsForm = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const {
    name,
    email,
    gender,
    weight,
    dailyNorma: userDailyNorma,
    activeHours,
  } = useSelector(selectCurrentUser);
  const isError = useSelector(selectIsError);
  const dailyNorma = userDailyNorma / 1000;
  const defaultValues = {
    name,
    email,
    gender,
    weight,
    dailyNorma,
    activeHours,
  };
  delete defaultValues.createdAt;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsFormSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const handleFieldChange = evt => {
    const { name, value } = evt.target;
    clearErrors(name);
    if (name === 'dailyNorma') {
      const newValue = value.replace(',', '.');
      setValue(name, newValue);
      return;
    }
    if (['weight', 'activeHours', 'dailyNorma'].includes(name)) {
      if (isNaN(Number(value))) {
        setValue(name, 0);
        return;
      }
      setValue(name, Number(value));
      return;
    }
    setValue(name, value);
  };

  const onSubmit = (originalFormData, evt) => {
    const data = { ...originalFormData };
    delete data.avatar;
    dispatch(updateUser({ ...data, dailyNorma: data.dailyNorma * 1000 }));

    if (!isError) {
      closeModal(evt);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={css.modalSettingContent}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        noValidate
      >
        <UserSettingsFormAvatar
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
        <div className={css.toColumns}>
          <UserSettingsFormFirstColumn
            register={register}
            errors={errors}
            handleFieldChange={handleFieldChange}
          />
          <UserSettingsFormSecondColumn
            register={register}
            errors={errors}
            watch={watch}
            handleFieldChange={handleFieldChange}
          />
        </div>
        <Button className={css.saveButton} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default UserSettingsForm;
