import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTaskHolder({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 12,
    position: "relative",
    cursor: "grab",
    width: "100%",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { attributes, listeners })
          : child
      )}
    </div>
  );
}
