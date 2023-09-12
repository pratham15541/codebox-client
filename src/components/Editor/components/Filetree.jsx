import { Box } from "@mui/material";
import React from "react";
import {IoMdArrowDropright} from "react-icons/io";
import { ResizableBox } from "react-resizable";
import "../../../assets/css/react-resizable.css";

const Filetree = () => {
  return (
    <>
        <ResizableBox
          width={230}
          height={475}
          resizeHandles={["e"]}
          minConstraints={[200, 475]}
          maxConstraints={[280, 475]}
        >
          <Box
            overflow={"auto"}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >

            <IoMdArrowDropright className="react-resizable react-resizable-handle react-resizable-handle-e" />
          </Box>
        </ResizableBox>

    </>
  );
};

export default Filetree;
