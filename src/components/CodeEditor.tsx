import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const handleChange = (value: any) => {
    onChange(value);
  };

  const onFormatClick = () => {
    const unformatedCode = editorRef.current.getValue();

    const formattedCode = prettier.format(unformatedCode, {
      parser: "babel",
      plugins: [parser],
      semi: true,
      singleQuote: false,
    });

    editorRef.current.setValue(formattedCode);
  };

  return (
    <>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        value={initialValue}
        onChange={handleChange}
        onMount={(editor) => (editorRef.current = editor)}
        height="500px"
        theme="vs-dark"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          tabSize: 2,
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </>
  );
};

export default CodeEditor;
