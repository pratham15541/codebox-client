import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import MessageContent from "./MessageContent";

const AiChatPanel = ({ onSend, loading }) => {
  const [input, setInput] = React.useState("");
  const messages = useSelector((state) => state.chat.messages);
  const themeMode = useSelector((state) => state.theme.mode);
  const bottomRef = useRef(null);

  const isDark = themeMode === "dark";
  const bgUser = isDark ? "#2d3748" : "#e3f2fd";
  const bgAssistant = isDark ? "#1a202c" : "#f5f5f5";
  const textColor = isDark ? "#e2e8f0" : "#1a202c";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        flex={1}
        overflow="auto"
        px={1.5}
        py={1}
        sx={{
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            background: isDark ? "#4a5568" : "#cbd5e0",
            borderRadius: 3,
          },
        }}
      >
        {messages.length === 0 && !loading && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={4}
            px={2}
          >
            Ask me to explain your code, debug errors, or walk through logic.
            I use your open editor content as context.
          </Typography>
        )}

        {messages.map((msg, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}
            mb={1.5}
          >
            <Paper
              elevation={0}
              sx={{
                px: 1.5,
                py: 1,
                maxWidth: "88%",
                bgcolor: msg.role === "user" ? bgUser : bgAssistant,
                borderRadius: 2,
                borderTopRightRadius: msg.role === "user" ? 0 : 2,
                borderTopLeftRadius: msg.role === "assistant" ? 0 : 2,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={0.5}
                fontWeight={600}
              >
                {msg.role === "user" ? "You" : "CodeBox AI"}
              </Typography>
              {msg.role === "assistant" ? (
                <MessageContent content={msg.content} isDark={isDark} />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: textColor, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {msg.content}
                </Typography>
              )}
            </Paper>
          </Box>
        ))}

        {loading && (
          <Box display="flex" alignItems="center" gap={1} px={1} py={1}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">
              Analyzing code...
            </Typography>
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        alignItems="flex-end"
        gap={0.5}
        p={1.5}
        borderTop={1}
        borderColor="divider"
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          size="small"
          placeholder="Explain this code / Help me debug..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!input.trim() || loading}
          sx={{ mb: 0.25 }}
        >
          <IoSend />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AiChatPanel;
