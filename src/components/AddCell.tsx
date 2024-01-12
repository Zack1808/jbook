import { useActions } from "../hooks/useActions";

import "./AddCell.css";

interface AddCellPropsType {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellPropsType> = ({ nextCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`${forceVisible && "force-visible"} add-cell`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-small is-rounded"
          onClick={() => insertCellAfter(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>{" "}
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-small is-rounded"
          onClick={() => insertCellAfter(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>{" "}
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
