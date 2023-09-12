import React, { useEffect } from "react";
import { WebContainer } from "@webcontainer/api";
import { expressFiles } from "../files/express";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { useLocation } from "react-router-dom";

// Declare variables for DOM elements and WebContainer instance
let webcontainerInstance = null;
let terminalEl = null;
let iframeEl = null;
let editorEl = null;
let shellProcess = null;
let terminal = null;
let fitAddon = null;
let initialized = false;

// Function to check if DOM elements are ready
function areDOMElementsReady() {
  return iframeEl && editorEl && terminalEl;
}

async function createTerminal(terminalEl) {
  fitAddon = new FitAddon();
  const terminal = new Terminal({
    // cursorBlink: true,
    convertEol: true,
  });
  terminal.loadAddon(fitAddon);
  terminal.open(terminalEl);

  // Return a promise that resolves when the terminal is ready
  await new Promise((resolve) => {
    terminal.onRender(() => {
      fitAddon.fit(); // Call fitAddon.fit() when the terminal is ready
      resolve(terminal);
    });
  });

  return terminal;
}

// Function to initialize the components
async function initializeComponents() {
  try {
    // Get DOM elements
    iframeEl = document.getElementById("iframeEl");
    editorEl = document.getElementById("editor");
    terminalEl = document.getElementById("terminalEl");

    // Check if any of the elements are null
    if (!areDOMElementsReady()) {
      console.log("One or more elements are null. Retrying in 2 seconds...");
      setTimeout(initializeComponents, 2000); // Retry after 2 seconds
      return;
    }

    console.log("Booting WebContainer...");
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(expressFiles);

    // When the server is ready, set the iframe's src
    webcontainerInstance.on("server-ready", (port, url) => {
      iframeEl.src = url;
      // console.log(url)
    });

    webcontainerInstance.on("port", async (port, type, url) => {
      if (type === "close") {
        iframeEl.src = "./serverOpenClose.html";
      }
    });

    console.log("WebContainer booted successfully!");

    // Create a terminal
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

    initialized = true;
  } catch (error) {
    console.error("Error booting WebContainer:", error);
  }
}

async function stopWebContainer() {
  console.log(JSON.stringify(webcontainerInstance)); // Log the instance before teardown
  if (webcontainerInstance !== null) {
    try {
      console.log("Stopping WebContainer...");

      await webcontainerInstance.teardown();
      console.log("WebContainer stopped"); // Log after teardown
      webcontainerInstance = null;
    } catch (error) {
      console.error("Error stopping WebContainer", error);
    }
  }
}

async function startShell(terminal) {
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

// Wait for the DOM to load and then initialize components

const Webcontainer = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/playground") {
      // console.log(location.pathname);
      initializeComponents();
    } else {
      console.log(location.pathname);
      stopWebContainer();
    }
  }, [location]);

  return <></>;
};

export default Webcontainer;
