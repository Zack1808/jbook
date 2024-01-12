import { useState, useEffect } from "react";

import bundle from "../bundler";

import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resizable from "./Resizable";

import { Cell } from "../state";
import { useActions } from "../hooks/useActions";

import "./CodeCell.css";

interface CodeCellPropsType {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellPropsType> = ({ cell }) => {
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const { updateCell } = useActions();

  const onChange = (value: string) => updateCell(cell.id, value);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cell.content]);

  return (
    <Resizable axis="vertical">
      <div className="code-cell-wrapper">
        <Resizable axis="horizontal">
          <CodeEditor initialValue={cell.content} onChange={onChange} />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
