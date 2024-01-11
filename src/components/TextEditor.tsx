import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./TextEditor.css";

const TextEditor: React.FC = () => {
  const [editting, setEditting] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  const editorRef = useRef<HTMLDivElement | null>(null);

  const onChange = (value: any) => {
    setText(value);
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
          <MDEditor.Markdown source={text} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-editor" ref={editorRef}>
      <MDEditor value={text} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
