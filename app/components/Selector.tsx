import { Select, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
  type: string;
  items: Record<string, string>;
  value?: string;  
  onValueChange: (value: string) => void;
}

const Selector = ({ type, items, value, onValueChange }: Props) => {
  return (
    <Stack spacing={3}>
      <Select
        isRequired
        value={value} 
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
      >
        <option value="" disabled style={{ color: "red" }}>
          Select {type}
        </option>
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
