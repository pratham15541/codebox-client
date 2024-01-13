import React, { useEffect,useState } from "react";
import { WebContainer } from "@webcontainer/api";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setMuiData } from "../store/slices/muiDataSlice";
import icons from "@exuanbo/file-icons-js";
import "@exuanbo/file-icons-js/dist/css/file-icons.min.css";
import "@exuanbo/file-icons-js/dist/fonts/devopicons.woff2";
import "@exuanbo/file-icons-js/dist/fonts/file-icons.woff2";
import "@exuanbo/file-icons-js/dist/fonts/fontawesome.woff2";
import "@exuanbo/file-icons-js/dist/fonts/mfixx.woff2";
import "@exuanbo/file-icons-js/dist/fonts/octicons.woff2";
import "../assets/css/FileTree.css";
import { setCodeForStore } from "../store/slices/codeSlice";
import ace from "ace-builds/src-min-noconflict/ace";
import { workerModules } from "../constants/workers";
import * as modes from "../constants/language";
import * as themes from "../constants/themes";
import * as snippets from "../constants/snippets";
import * as ext from "../constants/ext";
import * as keybindings from "../constants/keybinding";
import * as file from "../files/files";
// import * as prettier from "https://unpkg.com/prettier@3.1.1/standalone.mjs";
import * as prettier from "prettier/standalone.mjs";
import { prettierPlugins, parsers } from "../constants/prettierPlugins";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Declare variables for DOM elements and WebContainer instance
let webcontainerInstance = null;
let terminalEl = null;
let iframeEl = null;
let editorEl = null;
let textareaEl = null;
let shellProcess = null;
let terminal = null;
let fitAddon = null;
let prevSelectedLanguage = "";
let selectedLanguage = null;
let fileCheckInterval = null;
let fileChangeIntervalId = null;
let previousFileTree = null; // Initialize a variable to keep track of the previous file tree
let activeFile = null; // Define a variable to keep track of the active file
let fileTreeElement = null;
let searchAddon = null;
let activeFileElement = null;
let activeFolderElement = null;
let contextMenu = null;
let createFolder = null;
let createFile = null;
let li;
let searchInput = null;
let searchNextBtn = null;
let searchPreviousBtn = null;
let closeSearch = null;
let scrollToTopBtn = null;
let selectedTheme = null;
let selectedLanguageFiles = null;
let dispatch = null;
let formatCode = null;

/* 
git install
1. npm i isomorphic-git
2. isogit clone --url=https://github.com/pratham15541/demo-code-editor --depth=1 --singleBranch --dir=demo
3. cd demo
4. npm i
5. npm run start
*/

// setInterval(async () => {
// }, 5000);

// setInterval(async () => {
// if (webcontainerInstance) {
//   const fileTreeContent = await displayFolderAndFileStructure("/");
//   const formattedFileTree = JSON.stringify(
//     fileTreeContent,
//     (key, value) => {
//       if (key === "contents" && typeof value === "string") {
//         // Replace '\n' with actual newlines in the file content
//         return value.replace(/\\n/g, "\n");
//       }
//       return value;
//     },
//     2
//   );
//   // console.log(formattedFileTree);
// }
// },5000)

const Webcontainer = () => {

  const location = useLocation();
  dispatch = useDispatch();
  selectedLanguage = useSelector(
    (state) => state.languageSelector.langSelected
  );
  selectedTheme = useSelector((state) => state.themeSelector.selectedTheme);
const [isLoading, setIsLoading] = useState(true);
  const files = {
    assembly: file.assemblyFiles,
    ats: file.atsFiles,
    bash: file.bashFiles,
    c: file.cFiles,
    clisp: file.clispFiles,
    clojure: file.clojureFiles,
    cobol: file.cobolFiles,
    coffeescript: file.coffeescriptFiles,
    cpp: file.cppFiles,
    crystal: file.crystalFiles,
    csharp: file.csharpFiles,
    d: file.dFiles,
    dart: file.dartFiles,
    elixir: file.elixirFiles,
    elm: file.elmFiles,
    erlang: file.erlangFiles,
    fsharp: file.fsharpFiles,
    go: file.goFiles,
    groovy: file.groovyFiles,
    guile: file.guileFiles,
    hare: file.hareFiles,
    haskell: file.haskellFiles,
    html: file.htmlFiles,
    idris: file.idrisFiles,
    java: file.javaFiles,
    javascript: file.javascriptFiles,
    julia: file.juliaFiles,
    kotlin: file.kotlinFiles,
    lua: file.luaFiles,
    mercury: file.mercuryFiles,
    nim: file.nimFiles,
    nix: file.nixFiles,
    ocaml: file.ocamlFiles,
    pascal: file.pascalFiles,
    perl: file.perlFiles,
    php: file.phpFiles,
    plaintext: file.plaintextFiles,
    python: file.pythonFiles,
    raku: file.rakuFiles,
    ruby: file.rubyFiles,
    rust: file.rustFiles,
    sac: file.sacFiles,
    scala: file.scalaFiles,
    swift: file.swiftFiles,
    typescript: file.typescriptFiles,
    zig: file.zigFiles,
  };
  selectedLanguageFiles = files[selectedLanguage];

  async function fileTreeClickOne(event) {
    console.log("fileTreeClickOne");
    const target = event.target;
    const isFolder =
      target.classList.contains("folder") ||
      target.parentElement.classList.contains("folder");

    if (isFolder) {
      // Remove the "active-folder" class from the previously active folder
      if (activeFolderElement) {
        activeFolderElement.classList.remove("active-folder");
      }

      const folderElement = target.closest(".folder");
      selectedFolder = folderElement.getAttribute("data-folder-path");
      activeFolderElement = folderElement;

      // Add the "active-folder" class to the newly active folder
      activeFolderElement.classList.add("active-folder");

      // Clear the active file when selecting a folder
      setActiveFile(null);
    } else {
      // User clicked on a file, clear the active folder
      selectedFolder = null;

      // Remove the "active-folder" class from the previously active folder
      if (activeFolderElement) {
        activeFolderElement.classList.remove("active-folder");
      }

      // Set the active file
      const filePath = selectedFolder
        ? selectedFolder + "/" + target.textContent
        : target.textContent;
      setActiveFile(filePath);
    }
  }

  async function renameFileFunction() {
    if (activeFile && !selectedFolder) {
      // Handle renaming of the active file
      const currentFileName = activeFile.split("/").pop();
      const newName = prompt("Enter the new name for " + currentFileName + ":");
      if (newName) {
        if (newName !== currentFileName) {
          await renameItem(activeFile, newName);
        } else {
          alert("Please enter a different name.");
        }
      }
    } else if (selectedFolder) {
      // Handle renaming of the selected folder
      const currentFolderName = selectedFolder.split("/").pop();
      const newName = prompt(
        "Enter the new name for " + currentFolderName + ":"
      );
      if (newName) {
        if (newName !== currentFolderName) {
          await renameItem(selectedFolder, newName);
        } else {
          alert("Please enter a different name.");
        }
      }
    }
  }

  async function deleteFileFunction() {
    if (selectedFolder === "/") {
      alert("You cannot delete root folder");
      return;
    } else {
      let confirmDelete;
      if (selectedFolder) {
        const folderName = selectedFolder.replace(/\/\//g, "");
        confirmDelete = confirm(
          `Are you sure you want to delete "${folderName}" folder ?`
        );
      } else {
        const fileName = activeFile.replace(/\/\//g, "");
        confirmDelete = confirm(
          `Are you sure you want to delete "${fileName}" file?`
        );
      }
      if (confirmDelete) {
        deleteFolderRecursive(selectedFolder || activeFile);
      }
    }
  }

  async function documentKeyDown(event) {
    if (event.key === "F2") {
      await renameFileFunction();
    } else if (event.key === "Delete") {
      // console.log(event.key);
      await deleteFileFunction();
    }
  }

  async function fileTreeClickTwo(event) {
    console.log("fileTreeClickTwo");
    if (event.target.classList.contains("folder")) {
      resetFilePath();
    } else if (!event.target.closest("ul")) {
      resetFilePath();
    }
  }

  async function fileTreeContextMenu(event) {
    console.log("fileTreeContextMenu");
    if (webcontainerInstance) {
      event.preventDefault(); // Prevent the default browser context menu from showing

      // Position the context menu at the mouse cursor's position relative to the container
      contextMenu.style.left = event.clientX - 40 + "px";
      contextMenu.style.top = event.clientY - 40 + "px";

      // Display the context menu
      contextMenu.style.display = "block";
    } else {
      alert("Please wait for the container to start.");
      stopWebContainer();
      initializeComponents(selectedLanguageFiles);
    }
  }

  async function createFolderClick(event) {
    await createFolderFunction();
    contextMenu.style.display = "none";
  }

  async function createFileClick(event) {
    await createFileFunction();
    contextMenu.style.display = "none";
  }

  async function renameFileClick(event) {
    await renameFileFunction();
    contextMenu.style.display = "none";
  }

  async function deleteFileClick(event) {
    await deleteFileFunction();
    contextMenu.style.display = "none";
  }

  async function documentClick(event) {
    contextMenu.style.display = "none";
  }

  async function contextMenuClick(event) {
    event.stopPropagation();
  }

  async function terminalKeyDown(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "F") {
      console.log(event);
      // Show the search input field
      searchInput.style.display = "block";
      searchNextBtn.style.display = "block";
      searchPreviousBtn.style.display = "block";
      closeSearch.style.display = "block";
      searchInput.focus(); // Focus on the input field for immediate typing
      event.preventDefault(); // Prevent the browser's default search action
    }
  }

  async function searchInputFunction(event) {
    const searchTerm = searchInput.value;
    console.log(searchTerm);

    // Perform the search within the terminal using the SearchAddon
    if (searchTerm) {
      searchAddon.findNext(searchTerm);
    } else {
      // If the search term is empty, clear the search highlights
      searchAddon.clearSelection();
    }
  }

  async function searchNextFunction(event) {
    const searchTerm = searchInput.value;
    if (searchTerm) {
      searchAddon.findNext(searchTerm);
    }
  }

  async function searchPreviousFunction(event) {
    const searchTerm = searchInput.value;
    if (searchTerm) {
      searchAddon.findPrevious(searchTerm);
    }
  }

  async function searchKeyDown(event) {
    if (event.key === "Enter") {
      searchInput.style.display = "none";
      searchNextBtn.style.display = "none";
      searchPreviousBtn.style.display = "none";
      closeSearch.style.display = "none";
      event.preventDefault();
    }
  }

  async function closeSearchFunction(event) {
    searchInput.style.display = "none";
    searchNextBtn.style.display = "none";
    searchPreviousBtn.style.display = "none";
    closeSearch.style.display = "none";
  }

  async function scrollToTopFunction(event) {
    terminal.scrollToTop();
  }

  async function formatFile() {
    const fileContent = await getFileContent(activeFile);
    const fileExtension = activeFile.split(".").pop().toLowerCase();

    // Get the resolved value of the formatted file
    const formattedFile = await prettier.format(fileContent, {
      parser: parsers[fileExtension],
      plugins: prettierPlugins[fileExtension],
    });

    await writeToFile(activeFile, formattedFile);
    textareaEl.getSession().setValue(formattedFile);
    console.log("format code");
  }

  // Function to check if DOM elements are ready
  function areDOMElementsReady() {
    console.log("areDOMElementsReady");
    return iframeEl && editorEl && terminalEl;
  }

  //creating terminal
  async function createTerminal(terminalEl) {
    console.log("createTerminal");
    fitAddon = new FitAddon();
    searchAddon = new SearchAddon();
    const terminal = new Terminal({
      fontSize: 14,
      cursorBlink: true,
      convertEol: true,
    });
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(searchAddon);
    terminal.loadAddon(new WebLinksAddon());
    terminal.open(terminalEl);

    // Return a promise that resolves when the terminal is ready
    await new Promise((resolve) => {
      terminal.onRender(() => {
        fitAddon.fit(); // Call fitAddon.fit() when the terminal is ready
        searchAddon.activate(terminal);
        resolve(terminal);
      });
    });

    return terminal;
  }

  // Function to set the active file
  async function setActiveFile(filePath) {
    console.log("setActiveFile");
    activeFile = filePath;

    // Remove the "active-file" class from the previously active file
    if (activeFileElement) {
      activeFileElement.classList.remove("active-file");
    }

    // Find the corresponding file element and add the "active-file" class
    activeFileElement = fileTreeElement.querySelector(
      `[data-file-path="${filePath}"]`
    );
    if (activeFileElement) {
      activeFileElement.classList.add("active-file");
    }
  }

  // Function to initialize the components
  async function initializeComponents(selectedLanguageFiles) {
    console.log("initializeComponents");
    fileTreeElement = document.querySelector("#filetree");
    try {
      // Get DOM elements
      if (
        selectedLanguage === "javascript" &&
        location.pathname === "/playground"
      ) {
        iframeEl = document.getElementById("iframeEl");
        terminalEl = document.getElementById("terminalEl");

        // Check if any of the elements are null
        if (!areDOMElementsReady()) {
          console.log(
            "One or more elements are null. Retrying in 2 seconds..."
          );

          if (webcontainerInstance != null) {
            stopWebContainer();
            initializeComponents(selectedLanguageFiles);
          } else {
            setTimeout(() => initializeComponents(selectedLanguageFiles), 2000); // Retry after 2 seconds
          }
        }
      }

      console.log("Booting WebContainer...");
      webcontainerInstance = await WebContainer.boot();
      await webcontainerInstance.mount(selectedLanguageFiles);

      // When the server is ready, set the iframe's src
      webcontainerInstance.on("server-ready", (port, url) => {
        iframeEl.src = url;
        console.log(url);
      });

      webcontainerInstance.on("port", async (port, type, url) => {
        if (type === "close") {
          iframeEl.src = "./serverOpenClose.html";
        }
      });

      setIsLoading(false)
      console.log("WebContainer booted successfully!");

      // Create a terminal
      if (selectedLanguage === "javascript") {
        terminal = await createTerminal(terminalEl);

        await startShell(terminal);

        // Resize the terminal when the window is resized
        window.addEventListener("resize", () => {
          fitAddon.fit();
          shellProcess.resize({
            cols: terminal.cols,
            rows: terminal.rows,
          });
        });
      }
    } catch (error) {
      console.error("Error booting WebContainer:", error);
    }
  }

  function checkElement() {
    // console.log('checkElement')
    editorEl = document.getElementById("editor");
    fileTreeElement = document.querySelector("#filetree");

    contextMenu = document.getElementById("contextMenu");
    createFolder = document.getElementById("createFolder");
    createFile = document.getElementById("createFile");

    searchInput = document.getElementById("search-input");
    searchNextBtn = document.getElementById("search-next");
    searchPreviousBtn = document.getElementById("search-previous");
    closeSearch = document.getElementById("close-search");
    scrollToTopBtn = document.getElementById("scrollToTopBtn");

    formatCode = document.getElementById("formatCode");

    if (
      !fileTreeElement &&
      !textareaEl &&
      !contextMenu &&
      !editorEl &&
      !formatCode
    ) {
      // If the element is not found, repeat the check after a delay
      setTimeout(checkElement, 2000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
      return;
    }

    // If the element is found, perform any necessary actions
    // console.log("File tree element found:", fileTreeElement);
    // console.log("textareaEl:", textareaEl);

    if (webcontainerInstance === null) {
      // If webcontainerInstance is null, repeat the check after a delay
      setTimeout(checkElement, 2000);
      return;
    }

    if (editorEl === null) {
      setTimeout(checkElement, 2000);
    } else {
      textareaEl = ace.edit("editor");
      textareaEl.container.style.resize = "horizontal";
      document.addEventListener("mouseup", (e) => textareaEl.resize());

      console.log("textareaEl is not null");
    }

    // console.log("webcontainerInstance is not null");

    fileCheckInterval = 1000; // 5 seconds
    fileChangeIntervalId = setInterval(checkFileChanges, fileCheckInterval);

    window.addEventListener("beforeunload", async () => {
      clearInterval(fileChangeIntervalId);
      await removeFiles("/");
      stopWebContainer();
    });
  }

  // Start the initial check
  checkElement();

  // Function to check for file changes
  async function checkFileChanges() {
    // console.log('checkFileChanges')
    const currentFileTree = await getFileTree("/");

    if (!areFileTreesEqual(previousFileTree, currentFileTree)) {
      // File tree has changed, update the UI
      updateFileTree(currentFileTree);
    }

    previousFileTree = currentFileTree;
  }

  // Function to compare two file trees
  function areFileTreesEqual(tree1, tree2) {
    // console.log('areFileTreesEqual')
    return JSON.stringify(tree1) === JSON.stringify(tree2);
  }

  // Function to update the file tree UI
  async function updateFileTree(fileTree) {
    console.log("updateFileTree");
    // Clear the existing file tree UI
    fileTreeElement.innerHTML = "";

    // Render the updated file tree
    await readFiles("/", 0, fileTreeElement);

    convertAndDisplayFileTree().then((result) =>
      dispatch(setCodeForStore(result))
    );
  }

  // Function to get the current file tree
  async function getFileTree(directory) {
    // console.log('getFileTree')
    if (webcontainerInstance) {
      const files = await webcontainerInstance.fs.readdir(directory, {
        withFileTypes: true,
      });

      const fileTree = {};

      for (const file of files) {
        if (file.isDirectory()) {
          const subDirectory = `${directory}/${file.name}`;
          fileTree[file.name] = await getFileTree(subDirectory);
        } else {
          fileTree[file.name] = "file";
        }
      }

      return fileTree;
    }
  }

  async function readFiles(
    directory = "/",
    depth = 0,
    parentElement = document.body
  ) {
    console.log("readFiles");
    if (webcontainerInstance) {
      const files = await webcontainerInstance.fs.readdir(directory, {
        withFileTypes: true,
      });

      const folders = [];
      const filesList = [];

      // Separate folders and files
      for (const file of files) {
        if (file.isDirectory() && file.name !== "node_modules") {
          folders.push(file);
        } else {
          filesList.push(file);
        }
      }

      // Sort folders and files in ascending order
      folders.sort((a, b) => a.name.localeCompare(b.name));
      filesList.sort((a, b) => a.name.localeCompare(b.name));

      const ul = document.createElement("ul");

      // Process and display folders
      for (const folder of folders) {
        const indent = "  ".repeat(depth); // Indentation based on the depth
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = folder.name;

        const details = document.createElement("details");
        details.classList.add("folder");
        details.setAttribute("data-folder-path", `${directory}/${folder.name}`);
        details.style.marginLeft = `${depth * 20}px`; // Adjust margin based on depth

        const summary = document.createElement("summary");
        summary.textContent = `${indent}${folder.name}`;

        details.appendChild(summary);

        const subDirectory = `${directory}/${folder.name}`;
        await readFiles(subDirectory, depth + 1, details);
        li.appendChild(details);
        ul.appendChild(li);
      }

      // Process and display files with icons
      for (const file of filesList) {
        li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = file.name;

        span.classList.add("file");
        span.setAttribute("data-file-path", `${directory}/${file.name}`);

        // Get the icon class for the file name
        const iconClass = await getIconClass(file.name, false);
        if (iconClass) {
          // Create an icon element and set its class
          const iconElement = document.createElement("i");
          if (directory !== "/") {
            iconElement.style.marginLeft = "7px";
          }
          iconElement.className = `icon ${iconClass}`;
          li.appendChild(iconElement);
        }

        li.appendChild(span);

        const filePath = `${directory}/${file.name}`;
        span.addEventListener("click", async () => {
          console.log("File clicked:", filePath);
          const fileContent = await getFileContent(filePath);
          showFileContent(file.name, fileContent, filePath);

          // Set the active file to the currently selected file
          setActiveFile(filePath);
        });

        // Add event listener for renaming files on F2 key press
        li.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          const contextMenu = document.getElementById("contextMenu");
          // const renameFile = document.getElementById("renameFile");
          // const deleteFile = document.getElementById("deleteFile");
          // renameFile.onclick = async () => {
          //   const currentFileName = file.name;
          //   const newName = prompt(
          //     `Enter the new name for "${currentFileName}":`
          //   );
          //   if (newName) {
          //     if (newName !== currentFileName) {
          //       await renameItem(filePath, newName);
          //     } else {
          //       alert("Please enter a different name.");
          //     }
          //   }
          //   contextMenu.style.display = "none";
          // };

          // deleteFile.onclick = async () => {
          //   if (filePath === "/") {
          //     alert("You cannot delete the root folder.");
          //     return;
          //   }
          //   const confirmDelete = confirm(
          //     `Are you sure you want to delete "${file.name}"?`
          //   );
          //   if (confirmDelete) {
          //     await deleteFolderRecursive(filePath);
          //     contextMenu.style.display = "none";
          //   }
          // };

          contextMenu.style.left = `${event.clientX}px`;
          contextMenu.style.top = `${event.clientY}px`;
          contextMenu.style.display = "block";
        });

        ul.appendChild(li);
      }

      parentElement.appendChild(ul);
    } else {
      console.log("webcontainerInstance is null");
    }
  }

  async function stopWebContainer() {
    // console.log("stopWebContainer");
    // console.log(JSON.stringify(webcontainerInstance)); // Log the instance before teardown
    if (webcontainerInstance !== null) {
      try {
        console.log("Removing files...");
        await removeFiles("/");
        console.log("Files removed");
        console.log("clearing interval");
        // clearInterval(fileChangeIntervalId);
        console.log("interval cleared");
        console.log("Stopping WebContainer...");

        if (shellProcess) {
          // Kill the process and wait for it to complete
          await shellProcess.kill();
        }

        // Assuming shellProcess.kill() returns a Promise, you can use it like this:
        // If it doesn't return a Promise, you might need to modify this part accordingly

        // Teardown only after the kill process is completed
        await Promise.all([
          shellProcess ? shellProcess.kill() : Promise.resolve(), // Ensure shellProcess.kill() is a Promise
          webcontainerInstance.teardown(),
        ]);
        console.log("WebContainer stopped"); // Log after teardown
      } catch (error) {
        console.error("Error stopping WebContainer", error);
      } finally {
        webcontainerInstance = null; // Reset the instance to null
        shellProcess = null; // Reset shellProcess
      }
    }
  }

  async function startShell(terminal) {
    console.log("startShell");
    try {
      shellProcess = await webcontainerInstance.spawn("jsh", {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });

      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        })
      );

      const input = shellProcess.input.getWriter();

      terminal.onData((data) => {
        input.write(data);
      });

      return shellProcess;
    } catch (error) {
      console.error("Error starting shell:", error);
      // return null; // Handle the error gracefully, you can return null or another value
    }
  }

  async function getIconClass(name, isDirectory) {
    // console.log('getIconClass')
    try {
      // Check if it's a directory or a file
      if (!isDirectory) {
        const options = {
          color: true, // You can set this to false if you don't want color in the icon class
        };

        // Use the file name to get the file icon
        const fileIconClass = await icons.getClass(name, options);
        return fileIconClass;
      }
    } catch (error) {
      // Handle any errors (e.g., if the icon is not found)
      console.error("Error getting icon class:", error);
    }
    return null; // Return null for folders or in case of errors
  }

  async function getFileContent(filePath) {
    console.log("getFileContent");
    const file = await webcontainerInstance.fs.readFile(filePath, "utf-8");
    return file;
  }

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const debouncedInputHandler = debounce(() => {
    // Write content to the file, but only if it's the active file
    writeToFile(activeFile, textareaEl.getSession().getValue());

    convertAndDisplayFileTree().then((result) =>
      dispatch(setCodeForStore(result))
    );
  }, 0);

  function showFileContent(fileName, content, filePath) {
    console.log("showFileContent");

    const fileExtension = fileName.split(".").pop().toLowerCase();
    const editorMode = modes.languageExtension[fileExtension];
    const selectedWorkerModule = workerModules[editorMode];

    if (editorMode in workerModules) {
      // Load the worker module
      selectedWorkerModule
        .then((module) => {
          applyWorkerModule(editorMode, module.default);
          return module.default;
        })
        .then((workerModule) => {
          // Additional checks or actions based on editor mode and worker module
          ace.config.setModuleUrl(
            `ace/mode/${editorMode}_worker`,
            workerModule
          );
          textareaEl.session.setMode(`ace/mode/${editorMode}`);
        })
        .catch((error) => {
          console.error("Error loading worker module:", error);
        });
    } else if (fileExtension in modes.languageExtension) {
      if (fileExtension === "svg") {
        // Load the XML worker module for SVG files
        workerModules.xml
          .then((module) => {
            applyWorkerModule("xml", module.default);
            return module.default;
          })
          .catch((error) => {
            console.error("Error loading XML worker module:", error);
          });
      }
      // Set mode based on other file extensions
      textareaEl.session.setMode(`ace/mode/${editorMode}`);
    } else {
      textareaEl.session.setMode(`ace/mode/plain_text`);
      console.log("else :: " + textareaEl.getSession());
    }

    textareaEl.getSession().setValue(content);
    textareaEl.addEventListener("input", (e) => {
      // Write content to the file, but only if it's the active file
      // console.log(textareaEl.getSession().getValue())
      debouncedInputHandler();
    });
  }

  function applyWorkerModule(editorMode, workerModule) {
    // Additional checks or actions based on editor mode and worker module
    ace.config.setModuleUrl(`ace/mode/${editorMode}_worker`, workerModule);
    textareaEl.session.setMode(`ace/mode/${editorMode}`);
  }

  async function writeToFile(filePath, content) {
    console.log("writeToFile");
    if (activeFile === filePath) {
      await webcontainerInstance.fs.writeFile(filePath, content);
    }
  }

  async function removeFiles(directory) {
    console.log("removeFiles");
    if (webcontainerInstance) {
      const files = await webcontainerInstance.fs.readdir(directory, {
        withFileTypes: true,
      });

      for (const file of files) {
        const filePath = `${directory}/${file.name}`;

        if (file.isDirectory()) {
          await removeFiles(filePath); // Recursive call to delete files inside the subdirectory
          await webcontainerInstance.fs.rm(filePath, { recursive: true }); // Delete the subdirectory
        } else {
          await webcontainerInstance.fs.rm(filePath); // Delete the file
        }
      }
    }
  }

  async function installDependencies(terminal) {
    console.log("installDependencies");
    // Install dependencies
    const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
    // Wait for install command to exit
    return installProcess.exit;
  }

  async function startServer(terminal) {
    console.log("startServer");
    const serverProcess = await webcontainerInstance.spawn("npm", [
      "run",
      "start",
    ]);
    serverProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
    return serverProcess;
  }

  async function installDependenciesAndStartServer(terminal) {
    console.log("installDependenciesAndStartServer");
    try {
      // First, install dependencies
      const installD = await installDependencies(terminal);

      // If installation is successful, start the server
      if (installD === 0) {
        await startServer(terminal);
      }

      console.log("Application is ready.");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  let selectedFolder = null; // Initialize a variable to store the selected folder
  //mv
  async function renameWithMv(oldPath, newPath) {
    console.log("renameWithMv");
    try {
      // Use the webcontainerInstance.spawn method to run the 'mv' command
      const result = await webcontainerInstance.spawn("mv", [oldPath, newPath]);

      if (result) {
        console.log(`Renamed ${oldPath} to ${newPath}`);
        return true; // Successful rename
      }
    } catch (error) {
      console.error(`Error renaming ${oldPath} to ${newPath}:`, error);
      return false; // Rename failed due to an error
    }
  }

  async function renameItem(itemPath, newName) {
    console.log("renameItem");
    if (itemPath && newName) {
      try {
        const isFolder = itemPath === selectedFolder;

        // Check if the selected folder is "node_modules" and prevent renaming
        if (isFolder && selectedFolder === "//node_modules") {
          alert("You cannot rename the 'node_modules' folder.");
          return; // Exit the function without renaming
        }

        // Remove double slashes from the start of itemPath
        if (itemPath.startsWith("//")) {
          itemPath = itemPath.substring(2); // Remove the first slash
        }
        // Rename the item using the renameWithMv function
        const parentDirectory = itemPath.substring(
          0,
          itemPath.lastIndexOf("/")
        );
        let newPath = `${parentDirectory}/${newName}`;
        if (newPath.startsWith("/")) {
          newPath = newPath.substring(1); // Remove the first slash
        }
        const isRenameSuccessful = await renameWithMv(itemPath, newPath);

        if (isRenameSuccessful) {
          if (isFolder) {
            selectedFolder = null;
          } else {
            activeFile = newPath;
          }

          // Update the file tree UI
          const currentFileTree = await getFileTree("/");
          updateFileTree(currentFileTree);
        } else {
          alert(`Failed to rename ${itemPath} to ${newPath}.`);
        }
      } catch (error) {
        console.error("Error renaming item:", error);
      }
    }
  }

  async function deleteFolderRecursive(folderPath) {
    console.log("deleteFolderRecursive");
    console.log(`Deleting folder and contents at ${folderPath}`);

    // Delete the folder itself
    await webcontainerInstance.fs.rm(folderPath, { recursive: true });
    alert(
      `Finished deleting folder and contents at "${folderPath.replace(
        /\/\//g,
        ""
      )}"`
    );
  }

  function resetFilePath() {
    console.log("resetFilePath");
    selectedFolder = "/";
  }

  async function createFolderFunction() {
    console.log("createFolderFunction");
    const folderName = prompt("Enter folder name:");

    if (folderName) {
      try {
        // Determine the current path based on whether a folder is selected or not
        let currentPath = "/";
        if (selectedFolder) {
          currentPath = selectedFolder;
        } else if (activeFile) {
          currentPath = activeFile;
        }

        // Create the new folder path
        const newFolderPath = `${currentPath}/${folderName}`;

        // Check if the folder already exists by attempting to read it
        try {
          await webcontainerInstance.fs.readdir(newFolderPath);
          alert("Folder already exists.");
          return; // Exit the function if the folder exists
        } catch (error) {
          // If the folder doesn't exist, proceed to create it
        }

        // Create the new folder
        await webcontainerInstance.fs.mkdir(newFolderPath);

        // Append the new folder to the file tree UI
        const folderElement = document.createElement("details");
        folderElement.classList.add("folder");
        folderElement.setAttribute("data-folder-path", newFolderPath);
        folderElement.style.marginLeft = `${
          currentPath.split("/").length * 20
        }px`; // Adjust margin based on depth
        folderElement.innerHTML = `
          <summary>${folderName}</summary>
          <ul></ul>
        `;

        // Find the parent folder or root element to append the new folder
        let parentElement;
        if (selectedFolder) {
          parentElement = fileTreeElement.querySelector(
            `[data-folder-path="${selectedFolder}"]`
          );
        } else {
          parentElement = fileTreeElement; // Append to the root element if no folder is selected
        }

        if (parentElement) {
          const ulElement = parentElement.querySelector("ul");
          ulElement.appendChild(folderElement);
        }
      } catch (error) {
        alert("Please deselect the file to create the folder in.");
        console.error("Error creating folder:", error);
      }
    }
  }

  selectedFolder = "/";
  async function createFileFunction() {
    console.log("createFileFunction");

    try {
      // Check if a folder is selected

      if (!selectedFolder) {
        alert("No folder selected to create the file in.");
      } else {
        const fileName = prompt("Enter file name:");
        if (fileName) {
          // Create the new file path
          const newFilePath = `${selectedFolder}/${fileName}`;

          // Check if the file already exists by attempting to read it
          try {
            await webcontainerInstance.fs.readFile(newFilePath);
            alert("File already exists.");
            return; // Exit the function if the file exists
          } catch (error) {
            // If the file doesn't exist, proceed to create it
          }

          // Use the WebContainer API to create the file within the selected folder
          await webcontainerInstance.fs.writeFile(newFilePath, "");

          // Append the new file to the file tree UI
          const fileElement = document.createElement("li");
          fileElement.classList.add("file");
          fileElement.textContent = fileName;

          // Find the selected folder element to append the new file
          const folderElement = fileTreeElement.querySelector(
            `[data-folder-path="${selectedFolder}"]`
          );
          if (folderElement) {
            const ulElement = folderElement.querySelector("ul");
            ulElement.appendChild(fileElement);
          }
        }
      }
    } catch (error) {
      console.error("Error creating file:", error);
    }
  }

  async function displayFolderAndFileStructure(directory = "/", depth = 0) {
    const files = await webcontainerInstance.fs.readdir(directory, {
      withFileTypes: true,
    });

    const folders = [];
    const filesList = [];

    // Separate folders and files
    for (const file of files) {
      if (file.name === "node_modules" || file.name.includes("-lock")) {
        // Skip the node_modules directory
        continue;
      }
      if (file.isDirectory()) {
        folders.push(file);
      } else {
        filesList.push(file);
      }
    }

    // Sort folders and files in ascending order
    folders.sort((a, b) => a.name.localeCompare(b.name));
    filesList.sort((a, b) => a.name.localeCompare(b.name));

    let structure = {};

    // Process and add folders
    for (const folder of folders) {
      const subDirectory = `${directory}/${folder.name}`;
      structure[folder.name] = {
        directory: await displayFolderAndFileStructure(subDirectory, depth + 1),
      };
    }

    // Process and add files
    for (const file of filesList) {
      const filePath = `${directory}/${file.name}`;
      const fileContent = await getFileContent(filePath);
      structure[file.name] = {
        file: {
          contents: fileContent,
        },
      };
    }

    return structure;
  }

  function convertStructureToFilesList(structure) {
    const filesList = [];

    function processStructure(folderStructure, currentPath = "") {
      for (const item in folderStructure) {
        const fullPath = currentPath === "" ? item : `${currentPath}/${item}`;

        if (folderStructure[item].file) {
          const fileContent = folderStructure[item].file.contents;
          // Replace empty content with "\n"
          const content = fileContent.trim() || "\n";

          filesList.push({
            name: fullPath,
            content: content,
          });
        } else if (folderStructure[item].directory) {
          processStructure(folderStructure[item].directory, fullPath);
        }
      }
    }

    processStructure(structure);
    return filesList;
  }

  async function convertAndDisplayFileTree(structure) {
    if (webcontainerInstance) {
      const fileTreeContent = await displayFolderAndFileStructure("/");
      const formattedFileTree = JSON.stringify(
        fileTreeContent,
        (key, value) => {
          if (key === "contents" && typeof value === "string") {
            // Replace '\n' with actual newlines in the file content
            return value.replace(/\\n/g, "\n");
          }
          return value;
        },
        2
      );

      // Convert file tree structure to the desired format
      const filesList = convertStructureToFilesList(fileTreeContent);
      return filesList;
    }
  }

  useEffect(() => {
    if (location.pathname === "/playground") {
      const waitForElement = (selector, callback) => {
        const element = document.querySelector(selector);
        if (element) {
          callback(element);
        } else {
          setTimeout(() => waitForElement(selector, callback), 100);
        }
      };

      const attachEventListeners = () => {
        const fileTreeElement = document.getElementById("filetree");
        const createFolder = document.getElementById("createFolder");
        const createFile = document.getElementById("createFile");
        const renameFile = document.getElementById("renameFile");
        const deleteFile = document.getElementById("deleteFile");
        const contextMenu = document.getElementById("contextMenu");
        const terminalEl = document.getElementById("terminalEl");
        const searchInput = document.getElementById("search-input");
        const searchNextBtn = document.getElementById("search-next");
        const searchPreviousBtn = document.getElementById("search-previous");
        const closeSearch = document.getElementById("close-search");
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");
        const formatCode = document.getElementById("formatCode");

        if (
          fileTreeElement &&
          createFolder &&
          createFile &&
          contextMenu &&
          formatCode
        ) {
          fileTreeElement.addEventListener("click", fileTreeClickOne);
          document.addEventListener("keydown", documentKeyDown);
          fileTreeElement.addEventListener("click", fileTreeClickTwo);
          fileTreeElement.addEventListener("contextmenu", fileTreeContextMenu);
          createFolder.addEventListener("click", createFolderClick);
          createFile.addEventListener("click", createFileClick);
          renameFile.addEventListener("click", renameFileClick);
          deleteFile.addEventListener("click", deleteFileClick);
          document.addEventListener("click", documentClick);
          contextMenu.addEventListener("click", contextMenuClick);
        }
        if (selectedLanguage == "javascript") {
          formatCode.addEventListener("click", formatFile);
          terminalEl.addEventListener("keydown", terminalKeyDown);
          searchInput.addEventListener("input", searchInputFunction);
          searchNextBtn.addEventListener("click", searchNextFunction);
          searchPreviousBtn.addEventListener("click", searchPreviousFunction);
          searchInput.addEventListener("keydown", searchKeyDown);
          closeSearch.addEventListener("click", closeSearchFunction);
          scrollToTopBtn.addEventListener("click", scrollToTopFunction);
        }
      };

      waitForElement("#filetree", (fileTreeElement) => {
        waitForElement("#createFolder", (createFolder) => {
          waitForElement("#createFile", (createFile) => {
            waitForElement("#renameFile", (renameFile) => {
              waitForElement("#deleteFile", (deleteFile) => {
                waitForElement("#contextMenu", (contextMenu) => {
                  attachEventListeners();
                });
              });
            });
          });
        });
      });

      if (
        selectedLanguage == "javascript" &&
        terminalEl &&
        searchInput &&
        searchNextBtn &&
        searchPreviousBtn &&
        closeSearch &&
        scrollToTopBtn
      ) {
        waitForElement("#terminalEl", (terminalEl) => {
          waitForElement("#search-input", (searchInput) => {
            waitForElement("#search-next", (searchNextBtn) => {
              waitForElement("#search-previous", (searchPreviousBtn) => {
                waitForElement("#close-search", (closeSearch) => {
                  waitForElement("#scrollToTopBtn", (scrollToTopBtn) => {
                    waitForElement("#formatCode", (formatCode) => {
                      attachEventListeners();
                    });
                  });
                });
              });
            });
          });
        });
      } else {
        console.log("else: waitForElement Js");
      }
    }
  }, [location]);

  useEffect(() => {
    // console.log("webcontainer useEffect on change location");
    if (location.pathname === "/playground") {
      // console.log(location.pathname);
      if (webcontainerInstance === null) {
        // console.log("webcontainerInstance is null");
        initializeComponents(selectedLanguageFiles);
      }
    } else {
      stopWebContainer();
    }
  }, [location]);

  useEffect(() => {
    async function webcontainerOnChangeLanguage() {
      // console.log("webcontainerOnChangeLanguage");
      await stopWebContainer();
      if (selectedLanguageFiles && webcontainerInstance === null) {
        await initializeComponents(selectedLanguageFiles);
      } else {
        // console.log("selectedLanguageFiles is null");
      }
    }

    if (
      prevSelectedLanguage !== selectedLanguage &&
      location.pathname === "/playground" &&
      webcontainerInstance !== null
    ) {
      // Update the variable with the current selectedLanguage
      prevSelectedLanguage = selectedLanguage;

      webcontainerOnChangeLanguage();
    }
  }, [selectedLanguage, location]);

  return <>
  {
    isLoading && location.pathname === '/playground' && <>
        <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      position="fixed"
      top={0}
      left={0}
      zIndex={999}
      
      style={{ display: isLoading ? "flex" : "none" }}
    >
      <Box textAlign="center">
        <CircularProgress color="secondary" />
        <Typography variant="subtitle1" color="textSecondary" mt={2}>
          Loading...
        </Typography>
      </Box>
    </Box>

    </>
  }
  </>;
};

export default Webcontainer;
