import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

import ActionBar from "./ActionBar";

interface CellListItemPropsType {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemPropsType> = ({ cell }) => {
  return (
    <div>
      <ActionBar id={cell.id} />
      {cell.type === "code" ? (
        <CodeCell cell={cell} />
      ) : (
        <TextEditor cell={cell} />
      )}
    </div>
  );
};

export default CellListItem;
