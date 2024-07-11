// import css from './ChooseDate.module.css'

import React, { useEffect } from "react";

const ChooseDate = ({ selectedDate, setSelectedDate }) => {
  useEffect(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  const handleChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div>
      <label>
        Today:
        <input
          type="date"
          value={selectedDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};


export default ChooseDate;
