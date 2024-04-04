import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onDateChange: (year: number) => void;
  selectedYear: number;
}

const DateSelector = ({ onDateChange, selectedYear }: Props) => {
  const selectedDate = selectedYear ? new Date(selectedYear, 0, 1) : new Date();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const yearInt = date.getFullYear();
      onDateChange(yearInt);
    }
  };

  return (
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showYearPicker
        dateFormat="yyyy"
        placeholderText="Select year"
        className="border-2 border-gray-300 rounded-md text-center w-32 h-8 align-center"
      />
  );
};

export default DateSelector;
