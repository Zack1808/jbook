import { ResizableBox } from "react-resizable";

import "./Resizable.css";

interface ResizableType {
  axis: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableType> = ({ axis, children }) => {
  return (
    <ResizableBox
      height={axis === "horizontal" ? Infinity : 300}
      width={axis === "horizontal" ? 300 : Infinity}
      axis={axis === "horizontal" ? "x" : "y"}
      resizeHandles={axis === "horizontal" ? ["e"] : ["s"]}
      maxConstraints={
        axis === "horizontal"
          ? [window.innerWidth * 0.9, Infinity]
          : [Infinity, window.innerHeight * 0.9]
      }
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
