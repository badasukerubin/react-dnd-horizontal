import React, { memo, useEffect, useRef } from "react";
import { DragableType, TabProps } from "./types";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import Tab from "./Tab";

export default memo(function DragableTab({
  index,
  tab,
  reOrderTabs,
}: TabProps) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: DragableType.Tab,
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      // Index of the tab being dragged
      const dragIndex = item.index;
      // Index of the tab being hovered
      const hoverIndex = index as number;

      // Skip if dragged to the same position ie. if not dragged over Hovered tab
      if (dragIndex === hoverIndex) {
        return;
      }

      // Rect of the hovered tab
      const hoverBoundingRect = (
        ref.current as HTMLDivElement
      ).getBoundingClientRect();
      // Vertical middle of the hovered tab
      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
      // Current mouse position
      const clientOffset = monitor.getClientOffset();
      // Vertical offset of the mouse relative to the hovered tab
      const hoverClientX =
        (clientOffset as XYCoord).x - hoverBoundingRect.right;
      // Skip if dragged back to the dragged tab's original position
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Skip if dragged to the right half of the hovered tab
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Conitnue if dragged all the way to the full width of the hovered tab
      // Then Reorder the tabs
      reOrderTabs && reOrderTabs(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DragableType.Tab,
    item: () => {
      return { index, tab };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <div style={{ opacity: isDragging ? 0 : 1 }} ref={ref}>
      <Tab tab={tab} />
    </div>
  );
});
