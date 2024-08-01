import { useModal } from 'context';
import { Icon } from 'shared';
import WaterModal from '../../modal/WaterModal/WaterModal';

import clsx from 'clsx';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = ({ className, date }) => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(<WaterModal date={date} />);
  };

  return (
    <div className={css[className]}>
      <button
        type="button"
        className={clsx(css.addWaterBtn, 'tour-add-water')}
        onClick={handleClick}
      >
        <div className={css.iconPlusWrap}>
          <Icon iconId="icon-plus" className={css.iconPlus} />
        </div>
        Add water
      </button>
    </div>
  );
};

export default AddWaterBtn;
