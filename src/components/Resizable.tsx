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
  const [horizontalWidth, setHorizontalWidth] = useState<number>(
    window.innerWidth * 0.75
  );

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < horizontalWidth) {
          setHorizontalWidth(window.innerWidth * 0.75);
        }
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
      width={axis === "horizontal" ? horizontalWidth : Infinity}
      axis={axis === "horizontal" ? "x" : "y"}
      resizeHandles={axis === "horizontal" ? ["e"] : ["s"]}
      maxConstraints={
        axis === "horizontal"
          ? [width * 0.9, Infinity]
          : [Infinity, height * 0.9]
      }
      onResizeStop={(event, data) => {
        setHorizontalWidth(data.size.width);
      }}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
