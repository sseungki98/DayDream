import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

export type InputValue = string | number | ReadonlyArray<string>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface StyledProps {}
interface InputStyledProps {}
interface Props extends StyledProps, InputStyledProps {
  value?: InputValue;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaInput({ value = "", onChange, placeholder }: Props) {
  const [inputValue, setInputValue] = useState<InputValue>(value);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    onChange && onChange(event);
  };

  return <StyledInput value={value} onChange={changeHandler} placeholder={placeholder} maxLength={100} />;
}

export default TextAreaInput;

const StyledInput = styled.textarea`
  width: 80%;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #86a9f9;
  background-color: #f7f7f7;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    font-size: 16px;
    color: #d4d4d4;
    z-index: 1;
  }
`;
