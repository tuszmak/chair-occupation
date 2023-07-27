import React, { useState } from "react";

export const Seat = ({ handleSelect, seatNumber }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = (e) => {
    handleSelect(e.target.value);
    setIsSelected(!isSelected);
  };
  return isSelected ? (
    <button
      value={seatNumber}
      className="selectedSeat"
      onClick={(e) => handleClick(e)}
    >
      {seatNumber}
    </button>
  ) : (
    <button value={seatNumber} onClick={(e) => handleClick(e)}>
      {seatNumber}
    </button>
  );
};
