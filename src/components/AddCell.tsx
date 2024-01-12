import { useActions } from "../hooks/useActions";

import "./AddCell.css";

interface AddCellPropsType {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellPropsType> = ({
  previousCellId,
  forceVisible,
}) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`${forceVisible && "force-visible"} add-cell`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-small is-rounded"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>{" "}
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-small is-rounded"
          onClick={() => insertCellAfter(previousCellId, "text")}
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
