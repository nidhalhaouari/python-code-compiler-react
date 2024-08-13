import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  theme: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, theme }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <MonacoEditor
      height="40vh"
      language="python"
      value={code}
      onChange={handleEditorChange}
      theme={theme}
    />
  );
};

export default CodeEditor;
