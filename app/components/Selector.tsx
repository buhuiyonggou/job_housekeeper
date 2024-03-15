import { Select, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
  type: string;
  items: Record<string, string>;
  defaultValue: string;
  onValueChange: (value: string) => void;
}

const Selector = ({ type, items, defaultValue, onValueChange }: Props) => {
  return (
    <Stack spacing={3}>
      <Select
        placeholder={`Select ${type}`}
        defaultValue={defaultValue}
        onChange={(e) => onValueChange(e.target.value)}
      >
        {Object.entries(items).map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default Selector;
