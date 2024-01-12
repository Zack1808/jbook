import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemPropsType {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemPropsType> = ({ cell }) => {
  return (
    <div>
      {cell.type === "code" ? <CodeCell cell={cell} /> : <TextEditor />}
    </div>
  );
};

export default CellListItem;
