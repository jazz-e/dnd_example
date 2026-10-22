import { useDraggable } from "@dnd-kit/react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    fontSize: 36,
    lineHeight: 1.5,
    color: "rgb(101, 33, 228)",
  },
  highlighted: {
    color: "rebeccapurple",
  },
  container: {
    backgroundColor: "lightgreen",
    width: "400px",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
    margin: "20px",
  },
  button: {
    backgroundColor: {
      default: "#74f7c5",
      ":hover": "#dd54dd",
    },
    color: "#0f0f0f",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },

  no_border: {
    borderWidth: 0,
    margin: null,
    width: "300px",
    padding: "5px",
  },
});

type CardProps = {
  id: string;
  name: string;
  age: number;
  location: string;
};

export default function Card({ id, name, age, location }: CardProps) {
  const { ref } = useDraggable({
    id: id,
  });

  return (
    <button ref={ref} {...stylex.props(styles.container, styles.button)}>
      <h1 {...stylex.props(styles.base)}>Hello World</h1>
      <div {...stylex.props(styles.container, styles.no_border)}>
        <h3>Name: {name}</h3>
        <h3>Age: {age}</h3>
        <h3>Location: {location}</h3>
      </div>
    </button>
  );
}
