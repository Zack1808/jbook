import { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";

import "./Resizable.css";

interface ResizableType {
  axis: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableType> = ({ axis, children }) => {
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <ResizableBox
      className={
        axis === "horizontal" ? "resize-horizontal" : "resize-vertical"
      }
      height={axis === "horizontal" ? Infinity : 300}
      width={axis === "horizontal" ? width * 0.75 : Infinity}
      axis={axis === "horizontal" ? "x" : "y"}
      resizeHandles={axis === "horizontal" ? ["e"] : ["s"]}
      maxConstraints={
        axis === "horizontal"
          ? [width * 0.9, Infinity]
          : [Infinity, height * 0.9]
      }
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
