import { Cell } from "../state";

interface CellListItemPropsType {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemPropsType> = ({ cell }) => {
  return <div>{cell.id}</div>;
};

export default CellListItem;
