import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Fab,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MdClose,
  MdMinimize,
  MdOpenInFull,
  MdCloseFullscreen,
  MdSmartToy,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AiChatPanel from "./AiChatPanel";
import {
  openChat,
  closeChat,
  minimizeChat,
  maximizeChat,
  restoreChat,
  addMessage,
  setSessionId,
  setChatLoading,
  clearMessages,
} from "../../store/slices/chatSlice";
import { sendChatMessage, indexCodeForChat } from "../../helpers/helper";
import {
  getActiveCodeId,
  getEditorCodeSnippet,
} from "../../utils/playgroundState";
import "../../assets/css/Chat.css";

const POSITION_KEY = "codebox_chat_position";

const AiChatWindow = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isOpen, isMinimized, isMaximized, sessionId, loading } = useSelector(
    (state) => state.chat
  );
  const themeMode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.languageSelector.langSelected);
  const codeStore = useSelector((state) => state.code.codeStore);

  const dragRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState(() => {
    try {
      const saved = sessionStorage.getItem(POSITION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isDark = themeMode === "dark";

  const getCodeContext = () => {
    const editorCode = getEditorCodeSnippet();
    if (editorCode) return editorCode;
    if (typeof codeStore === "string" && codeStore.trim()) return codeStore;
    if (codeStore) return JSON.stringify(codeStore, null, 2);
    return "";
  };

  const handleSend = async (message) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Sign in to use AI code explanation");
      return;
    }

    dispatch(addMessage({ role: "user", content: message }));
    dispatch(setChatLoading(true));

    try {
      const codeId = getActiveCodeId();
      const codeSnippet = getCodeContext();

      if (codeId) {
        try {
          await indexCodeForChat(codeId);
        } catch {
          // Indexing is best-effort; chat still works with live editor snippet
        }
      }

      const data = await sendChatMessage({
        message,
        codeId: codeId || undefined,
        sessionId: sessionId || undefined,
        codeSnippet: codeSnippet || undefined,
        language,
      });

      if (data.sessionId && data.sessionId !== sessionId) {
        dispatch(setSessionId(data.sessionId));
      }

      dispatch(
        addMessage({
          role: "assistant",
          content: data.answer || "No response received.",
        })
      );
    } catch (error) {
      const errMsg =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to get AI response";
      dispatch(addMessage({ role: "assistant", content: `Error: ${errMsg}` }));
      toast.error("AI chat request failed");
    } finally {
      dispatch(setChatLoading(false));
    }
  };

  const handleDragStart = useCallback(
    (e) => {
      if (isMaximized || isMobile) return;
      const el = dragRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      const onMove = (moveEvent) => {
        const x = moveEvent.clientX - dragOffset.current.x;
        const y = moveEvent.clientY - dragOffset.current.y;
        const clamped = {
          x: Math.max(8, Math.min(x, window.innerWidth - rect.width - 8)),
          y: Math.max(64, Math.min(y, window.innerHeight - rect.height - 8)),
        };
        setPosition(clamped);
        sessionStorage.setItem(POSITION_KEY, JSON.stringify(clamped));
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [isMaximized, isMobile]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        if (isOpen && !isMinimized) {
          dispatch(minimizeChat());
        } else {
          dispatch(openChat());
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch, isOpen, isMinimized]);

  const headerBg = isDark ? "#1e293b" : "#ffffff";
  const panelBg = isDark ? "#0f172a" : "#ffffff";

  if (!isOpen) {
    return (
      <Tooltip title="AI Code Assistant (Ctrl+Shift+A)" placement="left">
        <Fab
          color="primary"
          aria-label="Open AI chat"
          onClick={() => dispatch(openChat())}
          className="ai-chat-fab"
        >
          <MdSmartToy size={24} />
        </Fab>
      </Tooltip>
    );
  }

  if (isMinimized) {
    return (
      <Paper
        elevation={6}
        className="ai-chat-minimized"
        onClick={() => dispatch(restoreChat())}
        sx={{ bgcolor: headerBg }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <MdSmartToy color="#6366f1" />
          <Typography variant="body2" fontWeight={600}>
            CodeBox AI
          </Typography>
          {language && (
            <Typography variant="caption" color="text.secondary">
              · {language}
            </Typography>
          )}
        </Box>
        <Box onClick={(e) => e.stopPropagation()}>
          <IconButton size="small" onClick={() => dispatch(restoreChat())}>
            <MdOpenInFull size={16} />
          </IconButton>
          <IconButton size="small" onClick={() => dispatch(closeChat())}>
            <MdClose size={16} />
          </IconButton>
        </Box>
      </Paper>
    );
  }

  const windowClass = isMaximized
    ? "ai-chat-window ai-chat-window--maximized"
    : isMobile
      ? "ai-chat-window ai-chat-window--mobile"
      : "ai-chat-window ai-chat-window--normal";

  const positionStyle =
    !isMaximized && !isMobile && position
      ? { top: position.y, left: position.x, bottom: "auto", right: "auto" }
      : {};

  return (
    <Paper
      ref={dragRef}
      elevation={8}
      className={windowClass}
      sx={{ bgcolor: panelBg, ...positionStyle }}
    >
      <Box
        className={`ai-chat-header ${!isMaximized && !isMobile ? "ai-chat-header--draggable" : ""}`}
        bgcolor={headerBg}
        onMouseDown={handleDragStart}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <MdSmartToy color="#6366f1" size={20} />
          <Box>
            <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
              CodeBox AI
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {language ? `${language} · Hybrid RAG` : "Code explanation"}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" onMouseDown={(e) => e.stopPropagation()}>
          <Tooltip title="New chat">
            <IconButton
              size="small"
              onClick={() => dispatch(clearMessages())}
              sx={{ fontSize: "0.75rem", mr: 0.5 }}
            >
              <Typography variant="caption" fontWeight={600}>
                New
              </Typography>
            </IconButton>
          </Tooltip>
          {isMaximized ? (
            <IconButton size="small" onClick={() => dispatch(restoreChat())}>
              <MdCloseFullscreen size={18} />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={() => dispatch(maximizeChat())}>
              <MdOpenInFull size={18} />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => dispatch(minimizeChat())}>
            <MdMinimize size={18} />
          </IconButton>
          <IconButton size="small" onClick={() => dispatch(closeChat())}>
            <MdClose size={18} />
          </IconButton>
        </Box>
      </Box>

      <Box flex={1} overflow="hidden">
        <AiChatPanel onSend={handleSend} loading={loading} />
      </Box>
    </Paper>
  );
};

export default AiChatWindow;
