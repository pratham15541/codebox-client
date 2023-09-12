import React from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

const TextAreaContainer = styled("div")({
  minWidth: "90%",
  width: "25rem",
  maxWidth: "100%",
  height: "60vh",
  maxHeight: "60vh",
  overflow: "auto",
});

const MyDiv = styled("div")({
  width: "100%",
  minHeight: "55vh",
  resize: "none",
  fontFamily: "monospace",
  fontSize: "1.2rem",
  padding: "8px",
  background: "#333",
  color: "#fff",
  wordWrap: "break-word",
});

const OutputDiv = styled("div")({
  fontFamily: "monospace",
});

const PreFormattedText = styled("pre")({
  whiteSpace: "pre-wrap",
});

const Output = () => {
  const codeOutput = useSelector((state) => state.codeOutput.codeOutput);

  return (
    <TextAreaContainer>
      <MyDiv>
        <u>
          <b style={{ color: "aquamarine", fontSize: "1.5rem" }}>Output</b>
        </u>

        {codeOutput?.stdout || codeOutput?.stderr || codeOutput?.error ? (
          <OutputDiv>
            <p style={{ marginTop: "1rem", color: "#FFE569" }}>
              StdOut:
              <span
                style={{
                  marginLeft: ".5rem",
                  color: "#B3FFAE",
                  fontSize: ".95rem",
                }}
              >
                <PreFormattedText>
                  {codeOutput.stdout} {/* No need for replacement */}
                </PreFormattedText>
              </span>
            </p>
            <p style={{ marginTop: "1rem", color: "#F24C3D" }}>
              StdErr:
              <span
                style={{
                  marginLeft: ".5rem",
                  color: "#dF8787 ",
                  fontSize: ".9r5em",
                }}
              >
                <PreFormattedText>
                  {codeOutput.stderr || ""}
                </PreFormattedText>
              </span>
            </p>
            <p style={{ marginTop: "1rem", color: "#DB005B" }}>
              Error:
              <span
                style={{
                  marginLeft: ".5rem",
                  color: "#fF8110",
                  fontSize: ".95rem",
                }}
              >
                <PreFormattedText>
                  {codeOutput.error || ""}
                </PreFormattedText>
              </span>
            </p>
          </OutputDiv>
        ) : (
          <></>
        )}
      </MyDiv>
    </TextAreaContainer>
  );
};

export default Output;
