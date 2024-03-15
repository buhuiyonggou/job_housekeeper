import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormLabel } from "@chakra-ui/react";

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
    <FormControl as="fieldset" className="flex items-center justify-center">
      <FormLabel htmlFor="year" className="mt-2">
        Year:
      </FormLabel>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showYearPicker
        dateFormat="yyyy"
        placeholderText="Select year"
        className="border-2 border-gray-300 rounded-md text-center w-24 h-8 align-center"
      />
    </FormControl>
  );
};

export default DateSelector;
