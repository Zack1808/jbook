import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") cumulativeCode.push(c.content);
      if (c.id === cellId) break;
    }
    return cumulativeCode.join("\n");
  });
};
