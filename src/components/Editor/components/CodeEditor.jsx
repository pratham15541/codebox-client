// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { EditorState } from "@codemirror/state";
// import CodeMirror from "@uiw/react-codemirror";
// import * as themes from "@uiw/codemirror-themes-all";
// import { loadLanguage } from "@uiw/codemirror-extensions-langs";
// import { setCodeForStore } from "../../../store/slices/codeSlice";
// import "../../../assets/css/Editor.css";
// import { styled } from "@mui/system";

// const CodeEditor = () => {

//   const StyledEditor = styled('div')`
//   margin-top: 10px;
//   * {
//     font-family: consolas;
//     line-height: 1;
//   }
// `;

//   const themeMode = useSelector((state) => state.theme.mode);
//   const selectedTheme = useSelector(
//     (state) => state.themeSelector.selectedTheme
//   );
//   const selectedLanguage = useSelector(
//     (state) => state.languageSelector.langSelected
//   );

//   const dispatch = useDispatch();

//   const langExtension = loadLanguage(selectedLanguage);
//   const extension = langExtension ? [langExtension] : [];

//   const [code, setCode] = useState("");

//   useEffect(() => {
//     async function codeEx() {
//       try {
//         const CodeEx = await import(
//           `../../../codeExample/lib/${selectedLanguage}.js`
//         );
//         setCode(CodeEx.default);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     codeEx();
//   }, [selectedLanguage]);

//   const state = EditorState.create({
//     doc: code || "",
//   });

//   const getThemeValue = () => {
//     // if (selectedTheme) {
//     //   return themes[selectedTheme];
//     // } else if (themeMode === "light") {
//     //   return "light";
//     // } else if (themeMode === "dark") {
//     //   return "dark";
//     // }
//     if (selectedTheme) {
//       // Check if the selected theme is "light" and return "light" directly
//       if (selectedTheme === "light" && themeMode === "light") {
//         return "light";
//       }
//       if (selectedTheme === "dark" && themeMode === "dark") {
//         return "dark";
//       }

//       // If the selected theme is not "light," then return the corresponding theme value from the 'themes' object
//       return themes[selectedTheme];
//     }
//   };

//   const selectedThemeValue = getThemeValue();
//   useEffect(() => {
//     dispatch(setCodeForStore(code));
//   }, [code]);

//   const handleCodeChange = (e) => {
//     dispatch(setCodeForStore(e));
//   };

//   return (
//     <>
//       <CodeMirror
//         style={{outline:themeMode == 'light' ?  'black solid .1px':''}}
//         id="codemirror-editor"
//         about="CodeMirror Component"
//         placeholder={"Please do something."}
//         height="87.75vh"
//         minWidth="96.8vw"
//         maxWidth="96.8vw"
//         value={state.doc.toString()}
//         theme={selectedThemeValue}
//         extensions={extension}
//         onChange={handleCodeChange} // Add this line
//       />

//     </>
//   );
// };

// export default CodeEditor;

// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCodeForStore } from "../../../store/slices/codeSlice";
// import { styled } from "@mui/system";

// import AceEditor from "react-ace";
// // import "ace-builds/src-noconflict/ace";
// import * as modes from "../../../constants/language";
// import * as themes from "../../../constants/themes";
// import * as snippets from "../../../constants/snippets";
// import * as workers from "../../../constants/workers";
// import * as ext from "../../../constants/ext";
// import * as keybindings from "../../../constants/keybinding";

// import styles from "../../../assets/css/Editor.module.css";

// const CodeEditor = () => {
//   const selectedTheme = useSelector(
//     (state) => state.themeSelector.selectedTheme
//   );
//   // console.log(selectedTheme);
//   const selectedLanguage = useSelector(
//     (state) => state.languageSelector.langSelected
//   );

//   const dispatch = useDispatch();

//   const [code, setCode] = useState("");

//   useEffect(() => {
//     async function codeEx() {
//       try {
//         const CodeEx = await import(
//           `../../../codeExample/lib/${selectedLanguage}.js`
//         );
//         setCode(CodeEx.default);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     codeEx();
//   }, [selectedLanguage]);

//   const handleCodeChange = (newCode) => {
//     try {
//       setCode(newCode);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <AceEditor
//         placeholder="Placeholder Text"
//         mode={selectedLanguage}
//         style={{
//           marginTop: "-9px",
//           height: "87.5vh",
//           width: "100%",
//           fontFamily: "consolas !important",
//           lineHeight: "1 !important",
//         }}
//         theme={selectedTheme}
//         className={styles.editor}
//         name="blah2"
//         fontSize={14}
//         showPrintMargin={false}
//         wrapEnabled={true}
//         showGutter={true}
//         highlightActiveLine={true}
//         value={code}
//         onChange={handleCodeChange}
//         setOptions={{
//           enableBasicAutocompletion: true,
//           enableLiveAutocompletion: true,
//           enableSnippets: true,
//           showLineNumbers: true,
//           tabSize: 2,
//         }}
//       />
//     </>
//   );
// };

// export default CodeEditor;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCodeForStore } from "../../../store/slices/codeSlice";
import ace from "ace-builds/src-noconflict/ace";
import styles from "../../../assets/css/Editor.module.css";
import style from "../../../assets/css/EditorJs.module.css";
import { workerModules } from "../../../constants/workers";
import * as modes from "../../../constants/language";
import * as themes from "../../../constants/themes";
import * as snippets from "../../../constants/snippets";
import * as ext from "../../../constants/ext";
import * as keybindings from "../../../constants/keybinding";
// import "../../../utils/Webcontainer";
import "../../../assets/css/webcontainer.css";

// Declare a module-level variable to store the editor instance
let editorInstance;

const CodeEditor = () => {
  const selectedTheme = useSelector(
    (state) => state.themeSelector.selectedTheme
  );
  const selectedLanguage = useSelector(
    (state) => state.languageSelector.langSelected
  );

  const dispatch = useDispatch();
  const editorRef = useRef(null); // Ref to store the editor instance

  // useEffect(async() => {
    
  // },[])

  useEffect(() => {
    if (editorRef.current) {
      // If editor instance already exists, update the theme
      editorRef.current.setTheme(`ace/theme/${selectedTheme}`);
    }
  }, [selectedTheme]);

  useEffect(() => {
    try {
      editorInstance = ace.edit("editor"); // Assign the editor instance to the module-level variable
      editorInstance.setTheme(`ace/theme/${selectedTheme}`);
      const selectedAceLanguage = modes.languageMappings[selectedLanguage];
      const selectedWorkerModule = workerModules[selectedAceLanguage];
      if (selectedAceLanguage in workerModules) {
        selectedWorkerModule.then((module) => {
          ace.config.setModuleUrl(
            `ace/mode/${selectedAceLanguage}_worker`,
            module.default
          );
          editorInstance.session.setMode(`ace/mode/${selectedAceLanguage}`);
        });
      } else {
        editorInstance.session.setMode(`ace/mode/${selectedAceLanguage}`);
      }

      editorInstance.setValue(""); // Set initial content here if needed

      editorInstance.container.style.resize = "horizontal";
      document.addEventListener("mouseup", e => (
        editorInstance.resize()
      ));
      

      editorInstance.setOptions({
        fontSize: "14px",
        showPrintMargin: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      });
      editorInstance.on("change", (e) => {
        dispatch(setCodeForStore(editorInstance.getValue()));
      });
      editorRef.current = editorInstance; // Store the editor instance in the ref

      async function loadCodeExample() {
        try {
          const codeExampleModule = await import(
            `../../../codeExample/${selectedLanguage}.js`
          );
          const codeExample = codeExampleModule.default;
          editorInstance.setValue(codeExample);
        } catch (error) {
          console.error("Error loading code example:", error);
        }
      }

      loadCodeExample(); // Load code example when component mounts

      return () => {
        editorInstance.destroy();
      };
    } catch (error) {
      console.log(error);
    }
  }, [selectedLanguage]);

  const handleCodeChange = (newCode) => {
    if (editorRef.current) {
      editorRef.current.setValue(newCode);
    }
  };

  return (
    <>
      {selectedLanguage === "javascript" ? (
        <>
        <div className="container">
          <div
            id="editor"
            className={style.editor}
            style={{
              marginTop: "-9px",
              height: "64vh",
              width: "50rem",
              fontFamily: "consolas !important",
              lineHeight: "1 !important",
            }}
            onChange={handleCodeChange}
          ></div>
          <div className="preview">
            <iframe id="iframeEl" src="./serverOpenClose.html"></iframe>
          </div>
          </div>
        </>
      ) : (
        <>
        <div>
          <div
            id="editor"
            className={styles.editor}
            style={{
              marginTop: "-9px",
              height: "87.5vh",
              width: "100%",
              fontFamily: "consolas !important",
              lineHeight: "1 !important",
            }}
            onChange={handleCodeChange}
          ></div>
          </div>
        </>
      )}
    </>
  );
};

export default CodeEditor;
