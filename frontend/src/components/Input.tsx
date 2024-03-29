import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

export type InputValue = string | number | ReadonlyArray<string>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface StyledProps {}
interface InputStyledProps {}
interface Props extends StyledProps, InputStyledProps {
  type: "text" | "number" | "email" | "textarea" | "password";
  value?: InputValue;
  placeholder: string;
  onChange?: (event: InputChangeEvent) => void;
}

function Input({ value = "", onChange, placeholder, type }: Props) {
  const [inputValue, setInputValue] = useState<InputValue>(value);

  const changeHandler = (event: InputChangeEvent) => {
    setInputValue(event.target.value);
    onChange && onChange(event);
  };

  return <StyledInput value={value} onChange={changeHandler} placeholder={placeholder} type={type} />;
}

export default Input;

const StyledInput = styled.input`
  width: 80%;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #86a9f9;
  background-color: #f7f7f7;
  font-size: 16px;
  padding-left: 10px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 16px;
    color: #d4d4d4;
    z-index: 1;
  }
`;
