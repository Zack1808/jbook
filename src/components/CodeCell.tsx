import { useState, useEffect } from "react";

import bundle from "../bundler";

import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resizable from "./Resizable";

import "./CodeCell.css";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const onChange = (value: string) => setInput(value);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable axis="vertical">
      <div className="code-cell-wrapper">
        <Resizable axis="horizontal">
          <CodeEditor initialValue={input} onChange={onChange} />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
