import { useActions } from "../hooks/useActions";

interface ActionBarPropsType {
  id: string;
}

const ActionBar: React.FC<ActionBarPropsType> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  const handleMoveCellUp = () => {
    moveCell(id, "up");
  };

  const handleMoveCellDown = () => {
    moveCell(id, "down");
  };

  const handleCellDelete = () => {
    deleteCell(id);
  };

  return (
    <div>
      <button onClick={handleMoveCellUp}>Up</button>
      <button onClick={handleMoveCellDown}>Down</button>
      <button onClick={handleCellDelete}>Delete</button>
    </div>
  );
};

export default ActionBar;
