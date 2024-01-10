import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setCodeForStore } from "../../../store/slices/codeSlice";
import ace from "ace-builds/src-min-noconflict/ace";
import Settings from "./Settings";
import styles from "../../../assets/css/Editor.module.css";
// import style from "../../../assets/css/EditorJs.module.css";
// import { workerModules } from "../../../constants/workers";
// import * as modes from "../../../constants/language";
// import * as themes from "../../../constants/themes";
// import * as snippets from "../../../constants/snippets";
// import * as ext from "../../../constants/ext";
// import * as keybindings from "../../../constants/keybinding";
// import "../../../utils/Webcontainer";
import "../../../assets/css/webcontainer.css";

// Declare a module-level variable to store the editor instance

const CodeEditor = () => {
  const selectedTheme = useSelector(
    (state) => state.themeSelector.selectedTheme
    );
    const selectedLanguage = useSelector(
      (state) => state.languageSelector.langSelected
      );
      
      let editorInstance;
  const [isCustomSettingsDrawerOpen, setIsCustomSettingsDrawerOpen] = useState(false);

  // const dispatch = useDispatch();
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
      // const selectedAceLanguage = modes.languageMappings[selectedLanguage];
      // const selectedWorkerModule = workerModules[selectedAceLanguage];
      // // if(selectedAceLanguage !== 'javascript'){
      // if (selectedAceLanguage in workerModules) {
      //   selectedWorkerModule.then((module) => {
      //     ace.config.setModuleUrl(
      //       `ace/mode/${selectedAceLanguage}_worker`,
      //       module.default
      //     );
      //     editorInstance.session.setMode(`ace/mode/${selectedAceLanguage}`);
      //   });
      // } else {
      //   editorInstance.session.setMode(`ace/mode/${selectedAceLanguage}`);
      // }

      // // }
      // editorInstance.setValue(""); // Set initial content here if needed

      editorInstance.container.style.resize = "horizontal";
      document.addEventListener("mouseup", (e) => editorInstance.resize());

      const fontSizeLocal = localStorage.getItem("fontSize");

      editorInstance.setOptions({
        fontSize:  fontSizeLocal ? `${fontSizeLocal}px` : '14px',
        showPrintMargin: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        wrap: true,
      });
      // editorInstance.on("change", (e) => {
      //   dispatch(setCodeForStore(editorInstance.getValue()));
      // });
      editorRef.current = editorInstance; // Store the editor instance in the ref
      
      async function loadCodeExample() {
        try {
          const codeExampleModule = await import(
            //       `../../../codeExample/${selectedLanguage}.js`
            `../../../codeExample/plaintext.js`
          );
          const codeExample = codeExampleModule.default;
          editorInstance.setValue(codeExample);
        } catch (error) {
          console.error("Error loading code example:", error);
        }
      }

      loadCodeExample(); // Load code example when component mounts 

      return () => {
        // editorInstance.destroy();
      };
    } catch (error) {
      console.log(error);
    }
  }, [selectedLanguage]);

 

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLanguage]);

  const handleKeyDown = (event) => {
    // Check if Ctrl (or Command on macOS) and , are pressed simultaneously
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "S") {
      event.preventDefault(); // Prevent the default behavior (Ace Editor settings)
      // Open your custom settings drawer
      setIsCustomSettingsDrawerOpen(true);
    }
  };

  return (
    <>
      {selectedLanguage === "javascript" ? (
        <>
          <div className="container">
            <div
              id="editor"
              className={styles.editor}
              style={{
                marginTop: "-9px",
                height: "64vh",
                width: "50rem",
                fontFamily: "consolas !important",
                lineHeight: "1 !important",
              }}
              
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
              className={`${styles.editor}`}
              style={{
                marginTop: "-9px",
                width: "100%",
                height: "64vh",
                fontFamily: "consolas !important",
                lineHeight: "1 !important",
                overflowX: "auto",
              }}
              
            ></div>
          </div>
        </>
      )}
      {isCustomSettingsDrawerOpen && (
        <Settings
          open={isCustomSettingsDrawerOpen}
          onClose={() => setIsCustomSettingsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default CodeEditor;
