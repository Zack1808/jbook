import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../state";
import { useActions } from "../hooks/useActions";

import "./TextEditor.css";

interface TextEditorPropsType {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorPropsType> = ({ cell }) => {
  const [editting, setEditting] = useState<boolean>(false);

  const { updateCell } = useActions();

  const editorRef = useRef<HTMLDivElement | null>(null);

  const onChange = (value: any) => {
    updateCell(cell.id, value);
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        !editorRef.current.contains(event.target as Node)
      )
        setEditting(false);
    };

    window.addEventListener("click", listener, { capture: true });

    return () =>
      window.removeEventListener("click", listener, { capture: true });
  }, []);

  if (!editting) {
    return (
      <div className="text-editor card" onClick={() => setEditting(true)}>
        <div className="card-content">
          <MDEditor.Markdown source={cell.content || "# Click to edit"} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-editor" ref={editorRef}>
      <MDEditor value={cell.content} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
