import { useActions } from "../hooks/useActions";

import "./ActionBar.css";

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
    <div className="action-bar">
      <button className="button is-primary is-small" onClick={handleMoveCellUp}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={handleMoveCellDown}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={handleCellDelete}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
