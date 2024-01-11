import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const [editting, setEditting] = useState<boolean>(false);
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
      <div onClick={() => setEditting(true)}>
        <MDEditor.Markdown source={"# Header"} />
      </div>
    );
  }

  return (
    <div ref={editorRef}>
      <MDEditor value={text} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
