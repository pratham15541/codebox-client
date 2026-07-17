import React from "react";
import SEO from "../seo/Seo";
import Editor from "../components/Editor/Editor";
import Webcontainer from "../utils/Webcontainer";
import AiChatWindow from "../components/Chat/AiChatWindow";

const Playground = () => {
  return (
    <>
      <SEO
        title="Playground"
        description="A code editor and compiler for more than 20+ programming languages. Includes a Node.js terminal for JavaScript projects, input field for providing input, and displays the output."
        name="Playground"
        type="Website"
      />
      <Webcontainer />
      <Editor />
      <AiChatWindow />
    </>
  );
};

export default Playground;
