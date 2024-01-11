import { useState } from "react";

import bundle from "../bundler";

import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resizable from "./Resizable";

import "./CodeCell.css";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onChange = (value: string) => setInput(value);

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable axis="vertical">
      <div className="code-cell-wrapper">
        <Resizable axis="horizontal">
          <CodeEditor initialValue={input} onChange={onChange} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
