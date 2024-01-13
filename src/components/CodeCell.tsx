import { useEffect } from "react";

import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resizable from "./Resizable";

import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

import "./CodeCell.css";

interface CodeCellPropsType {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellPropsType> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  const onChange = (value: string) => updateCell(cell.id, value);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cumulativeCode, cell.id]);

  return (
    <Resizable axis="vertical">
      <div className="code-cell-wrapper">
        <Resizable axis="horizontal">
          <CodeEditor initialValue={cell.content} onChange={onChange} />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle?.code} bundlingStatus={bundle?.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
