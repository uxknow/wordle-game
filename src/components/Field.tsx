import { Keyboard } from "./Keyboard";
import { useState } from "react";
import { range } from "../util/array";

const WORLD_LENGTH = 5;
const ROWS = 6;

type CellState = {
  letter: string;
  variant?: "correct" | "semi-correct" | "incorrect";
};

type Board = CellState[][];

const deepCopyField = (field): Board => JSON.parse(JSON.stringify(field));

const getEmptyCell = () => ({
  letter: "",
});

const getEmptyBoard = () => {
  return range(ROWS).map(() => range(WORLD_LENGTH).map(getEmptyCell));
};

export const Field = () => {
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [pressed, setPressed] = useState(null);
  const [backspace, setBackspace] = useState(null);
  const handleBackspace = () => {
    console.log("bsc");
  };
  const handlePressed = (e) => {
    /*const letter = buttons.map((row) => row.find((letter) => letter === key));
    setPressed(letter);
    console.log(pressed);*/
    const click = e.target.id;
    if (!click) return;

    setBoard((prev) => {
      const nextState = deepCopyField(prev);
      nextState[0][0].letter = click;
      return nextState;
    });
    console.log(board);
    console.log(click);
  };

  return (
    <>
      <div className="field">
        {board.map((row, idx) => (
          <div key={idx} className="field-row">
            {row.map((cell, i) => (
              <div className={`cell ${cell.variant}`} key={i}>
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard handlePressed={handlePressed} handleBackspace={handleBackspace} />
    </>
  );
};
