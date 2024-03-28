import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  helperText: string;
  register: UseFormRegister<any>;
  validationRules?: Object;
  error?: FieldError | undefined;
  inputAs?: "input" | "textarea";
}

const FloatInput = ({
  id,
  label,
  placeholder = " ",
  helperText,
  register,
  validationRules = {},
  error,
  inputAs = "input", // Default to 'input'
}: Props) => {
  const InputArea = inputAs === "textarea" ? Textarea : Input;

  return (
    <FormControl
      variant="floating"
      id={id}
      isRequired={validationRules.hasOwnProperty("required")}
      isInvalid={!!error}
    >
      <InputArea placeholder={placeholder} {...register(id, validationRules)} />
      <FormLabel htmlFor={id}>
        {label}
      </FormLabel>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FloatInput;
