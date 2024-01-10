import React, { useEffect, useState } from "react";
import { Box,Button } from "@mui/material";
import { IoMdArrowDropright } from "react-icons/io";
// import {MdExpandMore} from 'react-icons/md'
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { ResizableBox } from "react-resizable";
import { useSelector } from "react-redux";
import "../../../assets/css/react-resizable.css";


// const data = {
//   id: "1",
//   name: "Parent",
//   children: [
//     {
//       id: "2",
//       name: "index.js",
//     },
//     {
//       id: "3",
//       name: "package.json",
//     },
//   ],
// };

const Filetree = ({ display }) => {
  // const [activeFile, setActiveFile] = useState(null);
  // const [selectedFolder, setSelectedFolder] = useState(null);
  // let data = null;
  // const muiData = useSelector((state) => state.muiData.muiData);
  // data = JSON.parse(muiData);

  // const handleItemClick = (nodeId) => {
  //   // Find the node based on nodeId in your data
  //   const clickedNode = findNodeById(data, nodeId);

  //   if (clickedNode) {
  //     if (clickedNode.children && clickedNode.children.length > 0) {
  //       // Handle folder click (has children)
  //       setSelectedFolder(nodeId);
  //       setActiveFile(null); // Deselect any file

  //       const folderPath = getFolderPath(clickedNode);
  //       console.log("Folder clicked:", folderPath);
  //     } else {
  //       // Handle file click (no children)
  //       setActiveFile(nodeId);
  //       setSelectedFolder(null); // Deselect any folder

  //       const filePath = getFilePath(clickedNode);
  //       console.log("File clicked:", filePath);
  //     }
  //   }
  // };

  // // Helper function to get the folder path
  // const getFolderPath = (node) => {
  //   let path = `/${node.name}`;

  //   let parentNode = node.parent;
  //   while (parentNode) {
  //     path = `/${parentNode.name}${path}`;
  //     parentNode = parentNode.parent;
  //   }

  //   return path;
  // };

  // // Helper function to get the file path
  // const getFilePath = (node) => {
  //   return getFolderPath(node.parent) + `/${node.name}`;
  // };
  // // A recursive function to find a node by ID in your data
  // const findNodeById = (node, nodeId) => {
  //   if (node.id === nodeId) {
  //     return node;
  //   }
  //   if (Array.isArray(node.children)) {
  //     for (const child of node.children) {
  //       const foundNode = findNodeById(child, nodeId);
  //       if (foundNode) {
  //         return foundNode;
  //       }
  //     }
  //   }
  //   return null;
  // };

  // const renderTree = (nodes) => (
  //   <TreeItem
  //     key={nodes.id}
  //     nodeId={nodes.id}
  //     label={nodes.name}
  //     onClick={() => handleItemClick(nodes.id, false)}
  //   >
  //     {Array.isArray(nodes.children)
  //       ? nodes.children.map((node) => renderTree(node))
  //       : null}
  //   </TreeItem>
  // );

  return (
    <>
      <ResizableBox
        width={220}
        height={475}
        resizeHandles={["e"]}
        minConstraints={[200, 475]}
        maxConstraints={[400, 475]}
        style={{ display: display }}
      >
        <Box
          overflow={"auto"}
          width={"100%"}
          height={"98%"}
          display={"flex"}
          flexDirection={"column"}
          sx={{ border: "1px solid #777", padding: "0.5rem" }}
          // id="filetree"
        >
          {/* <Box>
            <TreeView
              aria-label="rich object"
              defaultExpanded={["root"]}
              defaultCollapseIcon={<BsChevronDown />}
              defaultExpandIcon={<BsChevronRight />}
            >
              {renderTree(data)}
            </TreeView>
          </Box> */}
          <Box  overflow={"auto"}
          width={"100%"}
          height={"98%"}
          display={"flex"}
          flexDirection={"column"} id="filetree"></Box>
        
        <Box id="contextMenu">
          <button id="createFolder">Create Folder</button>
          <button id="createFile">Create File</button>
          <button id="renameFile">Rename</button>
          <button id="deleteFile">Delete</button>
        </Box>
          {/* <IoMdArrowDropright className="react-resizable react-resizable-handle react-resizable-handle-e" /> */}
        </Box>
      </ResizableBox>
    </>
  );
};

export default Filetree;
