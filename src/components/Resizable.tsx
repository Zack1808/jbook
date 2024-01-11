import { ResizableBox } from "react-resizable";

import "./Resizable.css";

interface ResizableType {
  axis: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableType> = ({ axis, children }) => {
  return (
    <ResizableBox
      height={axis === "horizontal" ? Infinity : 700}
      width={axis === "horizontal" ? 700 : Infinity}
      axis={axis === "horizontal" ? "x" : "y"}
      handleSize={[100, 100]}
      resizeHandles={axis === "horizontal" ? ["e"] : ["s"]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
