import React from "react";
import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/system";
import {setCodeInput} from '../../../store/slices/codeInputSlice'
import { useDispatch } from "react-redux";

const TextAreaContainer = styled("div")({
  minWidth: "90%",
  width: "25rem",
  maxWidth: "100%",
  height: "60vh",
  maxHeight: "60vh",
  overflow: "auto",
});

const TextArea = styled(TextareaAutosize)({
  width: "100%",
  minHeight: "55vh",
  resize: "none",
  fontFamily: "monospace",
  fontSize: "1.2rem",
  padding: "8px",
});

const Input = () => {
  const dispatch = useDispatch()
const handleChangeInput = (event) => {
  const newInput = event.target.value;
    dispatch(setCodeInput(newInput));
};

  return (
    <TextAreaContainer>
      <TextArea placeholder="Please enter an input" onChange={handleChangeInput} />
    </TextAreaContainer>
  );
};

export default Input;
