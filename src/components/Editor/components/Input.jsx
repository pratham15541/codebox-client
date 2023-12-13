import React from "react";
import { TextareaAutosize, Input as I, Box } from "@mui/material";
import { styled } from "@mui/system";
import { setCodeInput } from "../../../store/slices/codeInputSlice";
import { setcodeCommand } from '../../../store/slices/codeCommandSlice'
import { useDispatch, useSelector } from "react-redux";
import {commands} from '../../../constants/command'

const TextAreaContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
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
  const selectedLanguage = useSelector(
    (state) => state.languageSelector.langSelected
  );
  const dispatch = useDispatch();
  const handleChangeInput = (event) => {
    const newInput = event.target.value;
    dispatch(setCodeInput(newInput));
  };

  const handleCommandChange = (event) => {
    const newCommand = event.target.value;
    dispatch(setcodeCommand(newCommand))
  }

  return (
    <TextAreaContainer>
      <TextArea
        placeholder="Please enter an input"
        onChange={handleChangeInput}
      />
      <I style={{
        color:'#fff',
        fontFamily: "monospace",
      }} type="text" placeholder={`Custom Command Ex: ${commands[selectedLanguage]}`} onChange={handleCommandChange} />
    </TextAreaContainer>
  );
};

export default Input;
