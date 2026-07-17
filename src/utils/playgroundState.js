const CODE_ID_KEY = "codebox_active_code_id";

let activeCodeId = null;

export function setActiveCodeId(id) {
  activeCodeId = id;
  if (id) {
    sessionStorage.setItem(CODE_ID_KEY, id);
  } else {
    sessionStorage.removeItem(CODE_ID_KEY);
  }
}

export function getActiveCodeId() {
  return activeCodeId || sessionStorage.getItem(CODE_ID_KEY) || null;
}

export function getEditorCodeSnippet() {
  try {
    const ace = window.ace;
    if (ace?.edit) {
      const editor = ace.edit("editor");
      const value = editor?.getValue?.();
      if (value?.trim()) return value;
    }
  } catch {
    // Ace editor may not be initialized yet
  }
  return "";
}
