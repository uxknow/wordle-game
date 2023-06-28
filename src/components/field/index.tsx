import { FC, MouseEvent, KeyboardEvent, useEffect, useMemo, useState, useContext } from "react";
import { Keyboard } from "../keyboard";
import { getRandomWord, isWord } from "../../utils/dictionary";
import { WORD_LENGTH } from "../../common/consts";
import { TBoard, ICellState, IStats, Variant } from "../../common/types/field";
import { IValueContext } from "../../common/types/field-context";
import {
  getEmptyBoard,
  getCurrCell,
  getCurrentRowBoard,
  IsFilledField,
  getWords,
  isRepeatedWord,
  getInitAttempts,
  updateAttempts,
} from "../../utils/game-field";
import { deepCopyField } from "../../utils/deepCopyField";
import { FieldContext } from "../field-context";
import { CustomModal } from "../modal";
import { decodedWord, encodedWord } from "../../utils/encodeWord";
import { Element } from "../../common/types/field";
import { notify } from "../../utils/notify";
import { ThemeContext } from "../themeContext";
import { IThemeContext } from "../../common/types/theme-context";
import { ModalContent } from "../../common/types/modal";
import { useTranslation } from "react-i18next";
import classesLight from "./light.module.scss";
import classesDark from "./dark.module.scss";

export const Field: FC = () => {
  const { i18n } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [isBackspaceActive, setIsBackspace] = useState(false);
  const [isEnterActive, setIsEnter] = useState(false);
  const [blockedInput, setBlockedInput] = useState(false);
  const [win, setWin] = useState(!!localStorage.getItem("result"));
  const [correctWord, setCorrectWord] = useState(
    decodedWord(localStorage.getItem("target") || "") || getRandomWord(i18n.language)
  );
  const [prevWord, setPrevWord] = useState(localStorage.getItem("lastWord") || "");
  const [prevLang, setPrevLang] = useState(
    !localStorage.getItem("i18nextLng")?.includes("uaen")
      ? "ua"
      : localStorage.getItem("i18nextLng")
  );
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

  const { theme: themeName } = useContext(ThemeContext) as IThemeContext;
  const theme = themeName === "dark" ? classesDark : classesLight;

  const keyChars = i18n.language === "en" ? /^[a-zA-Z]$/ : /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/;

  //додавання класу shake до поточного рядку поля
  const shakeRowAnimate = (row: ICellState[]) => {
    return (isEnterActive &&
      JSON.stringify(row) === JSON.stringify(getCurrentRowBoard(board)) &&
      !isWord(currentWord || "", i18n.language)) ||
      (isEnterActive &&
        (currentWord as string)?.length > 0 &&
        currentWord?.length !== WORD_LENGTH &&
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
      currentWord?.length === WORD_LENGTH &&
      JSON.stringify(row) === JSON.stringify(getCurrentRowBoard(board)) &&
      isWord(currentWord, i18n.language) &&
      !isRepeatedWord(currentWord || "", getWords(board))
      ? "flip-cell"
      : "";
  };

  //Збереження  данних в контекст
  useEffect(() => {
    setFieldInfo({ setCorrectWord, setBoard, setWin });
  }, [win]);

  //Встановлюємо нове слово при зміні словаря
  useEffect(() => {
    if (
      prevLang !== i18n.resolvedLanguage &&
      !localStorage.getItem("result") &&
      !localStorage.getItem("target")
    ) {
      setCorrectWord(getRandomWord(i18n.language) as string);
      setPrevLang(i18n.resolvedLanguage as string);
    }
  }, [i18n.resolvedLanguage]);

  //Отримання введеного слова
  const currentWord = useMemo(() => {
    const row = getCurrentRowBoard(board);
    const word = row?.map((cell) => cell.letter).join("");
    return word;
  }, [board]);

  //встановлюємо isEnterActive в false, щоб не було анімації
  useEffect(() => {
    if (document.body.className.includes("modal-body--open")) {
      setIsEnter(false);
    }
  }, [document.body.className.includes("modal-body--open")]);

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
        (e as KeyboardEvent).key.match(keyChars)
      ) {
        (e.target as HTMLElement).id = (e as KeyboardEvent).key;
        handlePressedClick(e as MouseEvent<HTMLDivElement>);
        changeActiveKey(e as MouseEvent<HTMLDivElement>);
      }
    };
    (document as Element).addEventListener("keyup", handleKeyUp);

    return () => (document as Element).removeEventListener("keyup", handleKeyUp);
  }, [blockedInput, currentWord, board, keyChars]);

  //блокування вводу
  useEffect(() => {
    if (currentWord === correctWord) {
      setBlockedInput(true);
      return;
    }

    if (currentWord?.length === WORD_LENGTH && prevWord !== currentWord) {
      setBlockedInput(true);
    } else if (isRepeatedWord(currentWord || "", getWords(board))) {
      setBlockedInput(true);
    } else {
      setBlockedInput(false);
    }
  }, [currentWord, prevWord, board]);

  //логіка кліку на enter
  const handleEnter = () => {
    if (
      currentWord?.length === 0 ||
      (prevWord === currentWord && !isRepeatedWord(currentWord || "", getWords(board))) ||
      win ||
      (IsFilledField(board) && localStorage.getItem("result"))
    ) {
      setActiveKey((prev) => "");
      return;
    }

    //блокування вводу, якщо  такого слова нема, або недостатньо букв
    if (
      (currentWord?.length === WORD_LENGTH && !isWord(currentWord, i18n.language)) ||
      isRepeatedWord(currentWord || "", getWords(board))
    ) {
      setBlockedInput(true);
      notify(currentWord, WORD_LENGTH, isWord, isRepeatedWord, getWords(board));
      setIsEnter(true);
      setActiveKey((prev) => "");
      return;
    } else if ((currentWord || "")?.length < WORD_LENGTH) {
      notify(currentWord, WORD_LENGTH, isWord, isRepeatedWord, getWords(board));
    }

    //збереження даних, коли слово вірне
    if (currentWord === correctWord) {
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
      localStorage.setItem("time", new Date().setHours(24, 0, 0, 0).toString());
    }

    //встановлення коліру клітинки
    if (currentWord?.length === WORD_LENGTH && isWord(correctWord || "", i18n.language)) {
      setPrevWord(currentWord);
      setBoard((prev) => {
        const nextState = deepCopyField(prev);
        const currRow = getCurrentRowBoard(nextState);

        const correctLetters = (correctWord as string).split("");
        const correctLetterCount = {};

        correctLetters.forEach((letter) => {
          correctLetterCount[letter] = (correctLetterCount[letter] || 0) + 1;
        });

        currRow?.forEach((cell, idx) => {
          if (
            correctWord &&
            cell.letter === correctWord[idx] &&
            correctLetterCount[cell.letter] > 0
          ) {
            cell.variant = "correct";
            correctLetterCount[cell.letter] -= 1;
          }
        });

        currRow?.forEach((cell) => {
          if (
            correctWord?.includes(cell.letter) &&
            cell.variant !== "correct" &&
            correctLetterCount[cell.letter] > 0
          ) {
            cell.variant = "semi-correct";
            correctLetterCount[cell.letter] -= 1;
          }
          if (!cell.variant) cell.variant = "incorrect";
        });
        return nextState;
      });
      localStorage.setItem("target", encodedWord(correctWord || ""));
      localStorage.setItem("lastWord", currentWord);
    }

    //збереження даних, коли слово не вірне
    if (
      IsFilledField(board) &&
      isWord(currentWord || "", i18n.language) &&
      correctWord !== currentWord
    ) {
      setStats((prev) => ({
        games: prev.games + 1,
        won: prev.won,
        attempts: prev.attempts,
      }));
      localStorage.setItem("result", "lost");
      localStorage.setItem("time", new Date().setHours(24, 0, 0, 0).toString());
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
    if (
      isEnterActive &&
      currentWord?.length === WORD_LENGTH &&
      isWord(currentWord, i18n.language) &&
      !isRepeatedWord(currentWord, getWords(board))
    ) {
      localStorage.setItem("board", JSON.stringify(board));
    }
  }, [board]);

  //коли гра закінчена, відкриття статистики
  useEffect(() => {
    const id = setTimeout (() => {
      if (localStorage.getItem("result")) {
        setIsOpenModal(true);
      } else {
        setIsOpenModal(false);
      }
    }, 800)
  
    return () => {
      clearTimeout(id)
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
    <div className={theme["content-container"]}>
      <main>
        <div className={theme.field}>
          {board.map((row, idx) => (
            <div key={idx} className={`${theme.row} ${theme[shakeRowAnimate(row)] || ""}`}>
              {row.map((cell, i) => (
                <div
                  className={`${theme.cell} ${theme[cell.variant as Variant] || ""} ${
                    theme[FlipRowAnimate(row)]
                  }`}
                  key={i}
                >
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
      <CustomModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        content={ModalContent.statistic}
      />
    </div>
  );
};
