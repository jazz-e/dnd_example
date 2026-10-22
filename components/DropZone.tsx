import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    backgroundColor: "yellow",
    fontSize: 36,
    lineHeight: 1.5,
    color: "rgb(101, 33, 228)",
  },
});

type CardDropProps = {
  id: string;
  children?: ReactNode;
};

export default function DropZone({ id, children }: CardDropProps) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      {...stylex.props(styles.base)}
      ref={ref}
      style={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        minHeight: 300,
      }}
    >
      {children}
    </div>
  );
}
