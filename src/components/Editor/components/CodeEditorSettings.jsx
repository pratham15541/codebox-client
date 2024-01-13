import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLanguage } from "../../../store/slices/languageSelectorSlice";
import { styled } from "@mui/system";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import ace from "ace-builds/src-noconflict/ace";


const FormControlWrapper = styled(FormControl)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const FontSize = () => {
  let editorInstance;
  let fS = localStorage.getItem("fontSize");
  const [fontSize, setFontSize] = useState(fS ? fS : "14");

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  useEffect(() => {
    editorInstance = ace.edit("editor");
    editorInstance.setOptions({
      fontSize: `${fontSize}px`,
    });
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  return (
    <FormControlWrapper sx={{ width: "100%" }}>
      <Input
        type="number"
        onChange={handleFontSizeChange}
        value={fontSize}
        sx={{ minWidth: 200, maxWidth: 200 }}
        placeholder="14"
      />
    </FormControlWrapper>
  );
};

const CursorStyle = () => {
  let editorInstance;
  let cS = localStorage.getItem("cursorStyle");
  const [cursorStyle, setCursorStyle] = useState(cS ? cS : "ace");

  const handleCursorStyleChange = (e) => {
    setCursorStyle(e.target.value);
  };

  const cursorStyles = {
    Ace: "ace",
    Slim: "slim",
    Smooth: "smooth",
    "Smooth And Slim": "smooth slim",
    Wide: "wide",
  };

  useEffect(() => {
    editorInstance = ace.edit("editor");
    editorInstance.setOptions({
      cursorStyle: `${cursorStyle}`,
    });
    localStorage.setItem("cursorStyle", cursorStyle);
  }, [cursorStyle]);

  return (
    <FormControlWrapper sx={{ width: "100%" }}>
      <InputLabel id="cursor-selection">Cursor</InputLabel>
      <Select
        labelId="cursor-selection"
        label="Cursor"
        value={cursorStyle}
        onChange={handleCursorStyleChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
        sx={{ minWidth: 200, maxWidth: 200 }}
        id="cursorSelector"
      >
        {
          Object.keys(cursorStyles).map((key) => (
            <MenuItem key={key} value={cursorStyles[key]}>
              {key}
            </MenuItem>
          ))
        }
      </Select>
    </FormControlWrapper>
  );
};

const KeyBinding = () => {
  let editorInstance
  let kbS = localStorage.getItem("keyBinding");
  const [keyBinding, setKeyBinding] = useState(kbS ? kbS : "null");

  const handleKeyBindingChange = (e) => {
    setKeyBinding(e.target.value);
  };

  const keyBindings = {
    Ace: "null",
    Vim: "ace/keyboard/vim",
    Emacs: "ace/keyboard/emacs",
    Sublime: "ace/keyboard/sublime",
    "Visual Studio": "ace/keyboard/vscode",
  };

  

  useEffect(() => {
    editorInstance = ace.edit("editor");
    editorInstance.setKeyboardHandler(keyBinding);
    localStorage.setItem("keyBinding", keyBinding);
  }, [keyBinding]);

  return (
    <FormControlWrapper sx={{ width: "100%" }}>
      <InputLabel id="cursor-selection">Cursor</InputLabel>
      <Select
        labelId="cursor-selection"
        label="Cursor"
        value={keyBinding}
        onChange={handleKeyBindingChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
        sx={{ minWidth: 200, maxWidth: 200 }}
        id="cursorSelector"
      >
        {
          Object.keys(keyBindings).map((key) => (
            <MenuItem key={key} value={keyBindings[key]}>
              {key}
            </MenuItem>
          ))
        }
      </Select>
    </FormControlWrapper>
  );
};

const Foldings = () => {
}


export { FontSize, CursorStyle ,KeyBinding};
