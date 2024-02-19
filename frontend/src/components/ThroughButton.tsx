import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  message: string;
  type?: "button" | "submit";
}

function ThroughButton({ onClick, message, type }: ButtonProps) {
  return (
    <SThroughButton type={type} onClick={onClick}>
      {message}
    </SThroughButton>
  );
}

export default ThroughButton;

const SThroughButton = styled.button`
  transition: 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  width: 80%;
  height: 45px;
  border: 1px solid #86a9f9;
  background-color: #f7f7f7;
  cursor: pointer;
  border-radius: 10px;
  box-sizing: border-box;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: var(--btn-bg);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:hover {
    color: white;
    background: #86a9f9;

    &::before {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;
