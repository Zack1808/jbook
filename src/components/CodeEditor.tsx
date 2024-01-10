import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const handleChange = (value: any) => {
    if (value) onChange(value);
    else onChange("");
  };

  return (
    <MonacoEditor
      value={initialValue}
      onChange={handleChange}
      height="500px"
      theme="vs-dark"
      language="javascript"
      options={{
        wordWrap: "on",
        minimap: {
          enabled: false,
        },
        tabIndex: 2,
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
