// Pure functions for history management (no DOM)

export function appendUserMessage(history, text) {
  return [...history, { role: 'user', content: text }];
}

export function appendAssistantMessage(history, text) {
  return [...history, { role: 'assistant', content: text }];
}

// Return last n items from history (default 20)
export function getTrimmedHistory(history, n = 20) {
  const start = Math.max(0, history.length - n);
  return history.slice(start);
}
