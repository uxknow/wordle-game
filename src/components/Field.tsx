import { FC, MouseEvent, KeyboardEvent } from "react";
import { Keyboard } from "./Keyboard";
import { useEffect, useMemo, useState, useContext } from "react";
import { getRandomWord, isWord } from "../utils/dictionary";
import { WORLD_LENGTH } from "../common/consts";
import { TBoard, ICellState, IStats } from "../common/types/field";
import { IValueContext } from "../common/types/field-context";
import {
  getEmptyBoard,
  getCurrCell,
  getCurrentRowBoard,
  IsFilledField,
  getWords,
  isRepeatedWord,
  getInitAttempts,
  updateAttempts,
} from "../utils/game-field";
import { deepCopyField } from "../utils/deepCopyField";
import { FieldContext } from "./FieldContextProvider";
import { CustomModal } from "./Modal";
import { decodedWord, encodedWord } from "../utils/encodeWord";
import { Element } from "../common/types/field";
import { notify } from "../utils/notify";

export const Field: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [isBackspaceActive, setIsBackspace] = useState(false);
  const [isEnterActive, setIsEnter] = useState(false);
  const [blockedInput, setBlockedInput] = useState(false);
  const [win, setWin] = useState(!!localStorage.getItem("result"));
  const [correctWorld, setCorrectWord] = useState(
    decodedWord(localStorage.getItem("target") || "") || getRandomWord()
  );
  const [prevWord, setPrevWord] = useState(localStorage.getItem("lastWord") || "");
  const { setFieldInfo } = useContext(FieldContext) as IValueContext;

  const boardFromLocalStorage = localStorage.getItem("board");
  const parsedBoard: TBoard | null = boardFromLocalStorage
    ? JSON.parse(boardFromLocalStorage)
    : null;
  const initialBoard: TBoard = parsedBoard || getEmptyBoard();
  const [board, setBoard] = useState<TBoard>(initialBoard);

  const statsFromLocalStorage = localStorage.getItem("stats");
  const parsedStats: IStats | null = statsFromLocalStorage
    ? JSON.parse(statsFromLocalStorage)
    : null;
  const initialStats: IStats = parsedStats || { games: 0, won: 0, attempts: getInitAttempts() };
  const [stats, setStats] = useState<IStats>(initialStats);

  //додавання класу shake до поточного рядку поля
  const shakeRowAnimate = (row: ICellState[]) => {
    return (isEnterActive &&
      JSON.stringify(row) === JSON.stringify(getCurrentRowBoard(board)) &&
      !isWord(currentWord || "")) ||
      (isEnterActive &&
        (currentWord as string)?.length > 0 &&
        currentWord?.length !== WORLD_LENGTH &&
        JSON.stringify(row) === JSON.stringify(getCurrentRowBoard(board))) ||
      (isEnterActive &&
        isRepeatedWord(currentWord || "", getWords(board)) &&
        JSON.stringify(row) === JSON.stringify(getCurrentRowBoard(board)))
      ? "shake"
      : "";
  };

  //додавання класу flip для поточної клітинки поля
  const FlipRowAnimate = (row: ICellState[]) => {
    return isEnterActive &&
      currentWord?.length === WORLD_LENGTH &&
      JSON.stringify(row) === JSON.stringify(getCurrentRowBoard(board)) &&
      isWord(currentWord) &&
      !isRepeatedWord(currentWord || "", getWords(board))
      ? "flip-cell"
      : "";
  };

  //Збереження  данних в контекст
  useEffect(() => {
    setFieldInfo({ setCorrectWord, setBoard, setWin });
  }, [win]);

  //Отримання введеного слова
  const currentWord = useMemo(() => {
    const row = getCurrentRowBoard(board);
    const word = row?.map((cell) => cell.letter).join("");
    return word;
  }, [board]);

  //подія на клік клавіатури
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent | MouseEvent<HTMLDivElement>) => {
      if ((e as KeyboardEvent).key === "Backspace") {
        handleBackspace();
      }
      if ((e as KeyboardEvent).key === "Enter") {
        handleEnter();
      }

      if (
        (e as KeyboardEvent).code.startsWith("Key") &&
        /^[a-zA-Z]+$/.test((e as KeyboardEvent).key)
      ) {
        (e.target as HTMLElement).id = (e as KeyboardEvent).key;
        handlePressedClick(e as MouseEvent<HTMLDivElement>);
        changeActiveKey(e as MouseEvent<HTMLDivElement>);
      }
    };
    (document as Element).addEventListener("keyup", handleKeyUp);

    return () => (document as Element).removeEventListener("keyup", handleKeyUp);
  }, [blockedInput, currentWord, board]);

  //блокування вводу
  useEffect(() => {
    console.log(correctWorld);

    if (currentWord === correctWorld) {
      setBlockedInput(true);
      return;
    }

    if (currentWord?.length === WORLD_LENGTH && prevWord !== currentWord) {
      setBlockedInput(true);
    } else if (isRepeatedWord(currentWord || "", getWords(board))) {
      setBlockedInput(true);
    } else {
      setBlockedInput(false);
    }
  }, [currentWord, prevWord, board]);

  // const notify = (word, wordLength, isWord) => {
  //     const message =
  //       word.length < wordLength
  //         ?toast.error("Not enough letters")
  //         : !isWord(word)
  //         ? toast.error("There is no such word in the dictionary, try another")
  //         : toast.error("This word already exists, try another");
  //         return message
  //   };

  //логіка кліку на enter
  const handleEnter = () => {
    if (
      currentWord?.length === 0 ||
      (prevWord === currentWord && !isRepeatedWord(currentWord || "", getWords(board))) ||
      win ||
      (IsFilledField(board) && localStorage.getItem("result"))
    ) {
      return;
    }

    //Повідомлення, що такого слова нема в словарі/недостатньо букв
    if (
      (currentWord?.length === WORLD_LENGTH && !isWord(currentWord)) ||
      isRepeatedWord(currentWord || "", getWords(board))
    ) {
      setBlockedInput(true);
      notify(currentWord, WORLD_LENGTH, isWord);
      setIsEnter(true);
      return;
    } else if ((currentWord || "")?.length < WORLD_LENGTH) {
      notify(currentWord, WORLD_LENGTH, isWord);
    }

    //збереження даних, коли слово вірне
    if (currentWord === correctWorld) {
      setWin(true);
      setBoard((prev) => {
        const newState = deepCopyField(prev);
        const currRow = getCurrentRowBoard(newState);

        currRow?.forEach((cell) => (cell.variant = "correct"));
        return newState;
      });
      setBlockedInput(true);
      setStats((prev) => ({
        games: prev.games + 1,
        won: prev.won + 1,
        attempts: updateAttempts(getWords(board), prev.attempts),
      }));
      localStorage.setItem("result", "won");
    }

    //встановлення коліру клітинки
    if (currentWord?.length === WORLD_LENGTH && isWord(correctWorld || "")) {
      setPrevWord(currentWord);
      setBoard((prev) => {
        const nextState = deepCopyField(prev);
        const currRow = getCurrentRowBoard(nextState);

        const correctLetters = (correctWorld as string).split("");
        const correctLetterCount = {};

        // Рахуємо кількість кожної літери в correctWorld
        correctLetters.forEach((letter) => {
          correctLetterCount[letter] = (correctLetterCount[letter] || 0) + 1;
        });

        currRow?.forEach((cell, idx) => {
          if (correctWorld && cell.letter === correctWorld[idx]) {
            cell.variant = "correct";
            correctLetterCount[cell.letter] -= 1;
          } else if (
            correctWorld &&
            correctWorld.includes(cell.letter) &&
            correctLetterCount[cell.letter] > 0
          ) {
            cell.variant = "semi-correct";
            correctLetterCount[cell.letter] -= 1;
          } else {
            cell.variant = "incorrect";
          }
        });
        return nextState;
      });
      localStorage.setItem("target", encodedWord(correctWorld || ""));
      localStorage.setItem("lastWord", currentWord);
    }

    //збереження даних, коли слово не вірне
    if (IsFilledField(board) && isWord(currentWord || "") && correctWorld !== currentWord) {
      setStats((prev) => ({
        games: prev.games + 1,
        won: prev.won,
        attempts: prev.attempts,
      }));
      localStorage.setItem("result", "lost");
    }

    setBlockedInput(false);
    setIsEnter(true);
    setIsBackspace(false);
    setActiveKey((prev) => "");
  };

  //встановлюємо stats в LS
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  //встановлюємо boards в LS
  useEffect(() => {
    if (isEnterActive && currentWord?.length === WORLD_LENGTH && isWord(currentWord)) {
      localStorage.setItem("board", JSON.stringify(board));
    }
  }, [board]);

  //коли гра закінчена, відкриття статистики
  useEffect(() => {
    if (localStorage.getItem("result")) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [localStorage.getItem("result")]);

  //логіка кліку на  backspace
  const handleBackspace = () => {
    if (
      (currentWord === prevWord && !isRepeatedWord(currentWord, getWords(board))) ||
      localStorage.getItem("result")
    ) {
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
    setIsEnter(false);
  };

  //логіка кліку на віртуальну-клавіатуру
  const handlePressedClick = (e: MouseEvent<HTMLDivElement>) => {
    const click = (e.target as HTMLButtonElement).id;
    if (!click || (e.target as HTMLButtonElement).textContent === "ENTER") return;

    setBoard((prev) => {
      const nextState = deepCopyField(prev);
      const emptyCell = nextState.flat().find((cell) => cell.letter === "");

      if (emptyCell && !blockedInput) {
        emptyCell.letter = click;
      }
      return nextState;
    });

    changeActiveKey(e);
    setIsBackspace(false);
    setIsEnter(false);
  };

  //Підсвічування активної клавіші
  const changeActiveKey = (e: MouseEvent<HTMLDivElement>) => {
    const click = (e.target as HTMLButtonElement).id;
    setActiveKey(click);
  };

  return (
    <div className="content-container">
      <main>
        <div className="field">
          {board.map((row, idx) => (
            <div key={idx} className={`field-row ${shakeRowAnimate(row)}`}>
              {row.map((cell, i) => (
                <div className={`cell ${cell.variant} ${FlipRowAnimate(row)}`} key={i}>
                  {cell.letter}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Keyboard
        isBackspaceActive={isBackspaceActive}
        isEnterActive={isEnterActive}
        isActiveKey={activeKey}
        handlePressedClick={handlePressedClick}
        handleBackspace={handleBackspace}
        handleEnter={handleEnter}
      />
      <CustomModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  );
};
