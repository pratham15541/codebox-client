import React from "react";
import { Typography, Box } from "@mui/material";
import "../../assets/css/Chat.css";

function parseMessageContent(content) {
  const parts = [];
  const regex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", language: match[1] || "", value: match[2].trim() });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) });
  }

  return parts.length ? parts : [{ type: "text", value: content }];
}

const MessageContent = ({ content, isDark }) => {
  const parts = parseMessageContent(content);

  return (
    <Box>
      {parts.map((part, idx) =>
        part.type === "code" ? (
          <Box key={idx}>
            {part.language && (
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: "block" }}>
                {part.language}
              </Typography>
            )}
            <pre
              className={`ai-chat-code-block ${isDark ? "ai-chat-code-block--dark" : "ai-chat-code-block--light"}`}
            >
              {part.value}
            </pre>
          </Box>
        ) : (
          <Typography
            key={idx}
            variant="body2"
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {part.value}
          </Typography>
        )
      )}
    </Box>
  );
};

export default MessageContent;
