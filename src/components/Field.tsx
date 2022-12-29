import { Keyboard } from "./Keyboard";
import { useEffect, useMemo, useState } from "react";
import { range } from "../util/array";
import { getRandomWord, isWord } from "../util/dictionary";

const WORLD_LENGTH = 5;
const ROWS = 6;

type CellState = {
  letter: string;
  variant?: "correct" | "semi-correct" | "incorrect";
};

type Board = CellState[][];

//копия игрового поля
const deepCopyField = (field): Board => JSON.parse(JSON.stringify(field));

//пустая ячейка
const getEmptyCell = () => ({
  letter: "",
});

//Пустое игровое поле
const getEmptyBoard = () => {
  return range(ROWS).map(() => range(WORLD_LENGTH).map(getEmptyCell));
};

const getCurrCell = (board: Board): CellState | undefined => {
  const boardArray = board.flat();
  const cellIndex = boardArray.findIndex((cell) => cell.letter === "");
  const lastCellIndex = boardArray.findIndex((cell, i, arr) => cell === arr[arr.length - 1]);
  const currCell =
    cellIndex > 0
      ? boardArray[cellIndex - 1]
      : lastCellIndex
      ? boardArray[lastCellIndex]
      : undefined;
  return currCell;
};

const getCurrentRowBoard = (board: Board) => {
  const currCell = getCurrCell(board);
  const row = board.find((row) => (currCell ? row.indexOf(currCell) !== -1 : undefined));
  return row;
};

export const Field = () => {
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [activeKey, setActiveKey] = useState("");
  const [isBackspace, setIsBackspace] = useState(false);
  const [correctWorld, setCorrectWorld] = useState(getRandomWord());
  const [blockedInput, setBlockedInput] = useState(true);
  const [win, setWin] = useState(false);

  //Получение введеного слова
  const currentWorld = useMemo(() => {
    const row = getCurrentRowBoard(board);
    const world = row?.map((cell) => cell.letter).join("");
    return world;
  }, [board]);

  //событие на клик клавиатуры
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Backspace") {
        handleBackspace();
      }
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        (e.target as HTMLElement).id = e.key;
        handlePressedClick(e);
        changeActiveKey(e);
      }
    };
    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [blockedInput, currentWorld]);

  useEffect(() => {
    if (currentWorld && currentWorld.length === WORLD_LENGTH) {
      if (currentWorld === correctWorld) {
        setWin(true);
      } else if (isWord(correctWorld)) {
        setBoard((prev) => {
          const nextState = deepCopyField(prev);
          const currRow = getCurrentRowBoard(nextState);
          currRow?.forEach((cell, idx) => {
            if (correctWorld && cell.letter === correctWorld[idx]) {
              cell.variant = "correct";
            } else if (correctWorld && correctWorld.indexOf(cell.letter) !== -1) {
              cell.variant = "semi-correct";
            } else {
              cell.variant = "incorrect";
            }
          });
          return nextState;
        });
      } else {
        setBlockedInput(true);
      }
    } else {
      setBlockedInput(false);
    }

    console.log(correctWorld);
    console.log(getCurrCell(board));
  }, [currentWorld]);

  useEffect(() => {
    if (win === true) {
      setCorrectWorld(getRandomWord());
      setBoard(getEmptyBoard());
      setWin(false);
    }
  }, [win]);

  //логика клика на  backspace
  const handleBackspace = () => {
    if (currentWorld && currentWorld.length === WORLD_LENGTH && !blockedInput) {
      return;
    }
    setBoard((prev) => {
      const nextState = deepCopyField(prev);
      const currCell = getCurrCell(nextState);
      if (currCell) {
        currCell.letter = "";
      }
      return nextState;
    });
    setIsBackspace(true);
    setActiveKey((prev) => (prev = ""));
  };

  //логика клика на виртуальную-клавиатуру
  const handlePressedClick = (e) => {
    const click = e.target.id;
    if (!click && e.target.textContent !== "Backspace") return;

    /* if (blockedInput) {
      return;
    }*/

    setBoard((prev) => {
      const nextState = deepCopyField(prev);
      const emptyCell = nextState.flat().find((cell) => cell.letter === "");

      if (emptyCell) {
        emptyCell.letter = click;
      }
      return nextState;
    });

    changeActiveKey(e);
    setIsBackspace(false);
  };

  //Подсветка активной клавиши
  const changeActiveKey = (e) => {
    const click = e.target.id;
    setActiveKey(click);
  };

  //Сообщение о проигрыше
  const loseGame = () => {
    const print = board.flat().reduce((acc, cell) => {
      if (cell.letter !== "" && currentWorld !== correctWorld) {
        acc = "You lose";
      } else {
        acc = "";
      }
      return acc;
    }, "");
    return print;

    /*let print = "";
    board.flat().forEach((cell) => {
      if (cell.letter !== "" && currentWorld !== correctWorld) {
        print = "You lose";
      } else {
        print = "";
      }
    });
    return print;*/
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
      <div className={loseGame() ? "showMessage" : "hideMessage"}>{loseGame()}</div>
      <Keyboard
        isBackspace={isBackspace}
        isActiveKey={activeKey}
        handlePressedClick={handlePressedClick}
        handleBackspace={handleBackspace}
      />
    </>
  );
};
