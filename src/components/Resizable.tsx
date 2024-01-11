import { ResizableBox } from "react-resizable";

import "./Resizable.css";

interface ResizableType {
  axis: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableType> = ({ axis, children }) => {
  return (
    <ResizableBox
      className={
        axis === "horizontal" ? "resize-horizontal" : "resize-vertical"
      }
      height={axis === "horizontal" ? Infinity : 300}
      width={axis === "horizontal" ? window.innerWidth * 0.75 : Infinity}
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
