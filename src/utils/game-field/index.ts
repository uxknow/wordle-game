import { WORD_LENGTH, ROWS } from "../../common/consts";
import { TBoard, ICellState, TAttempts } from "../../common/types/field";

//порожня клітинка
const getEmptyCell = () => ({
  letter: "",
});

//Довжина слова
const range = (n: number) => [...new Array(n).keys()];

//Порожнє ігрове поле
export const getEmptyBoard = () => {
  return range(ROWS).map(() => range(WORD_LENGTH).map(getEmptyCell));
};

//Поточна клітинка
export const getCurrCell = (board: TBoard): ICellState | undefined => {
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

//Поточний рядок
export const getCurrentRowBoard = (board: TBoard) => {
  const currCell = getCurrCell(board);
  const row = board.find((row) => (currCell ? row.indexOf(currCell) !== -1 : undefined));
  return row;
};

//Перевірка чи все поле заповнено
export const IsFilledField = (board: TBoard) => {
 return !board.flat().find((cell) => cell.letter === "")
}

//Отримати всі слова
export const getWords = (board: TBoard) => {
    return board.map((row) => row.map((word) => word.letter).join(""));
}

//Перевірка на повторення слова
export const isRepeatedWord = (currentWord: string, words: string[]) => {
    return  currentWord?.length === WORD_LENGTH && words?.filter(word => word === currentWord).length > 1;
}

//Начальний об'єкт для зберігання кількості спроб вгаданого слова
export const getInitAttempts = (rows: number = ROWS): TAttempts => {
  return new Array(rows).fill("-").reduce((acc, _, i) => {
    acc[i + 1] = 0;
    return acc;
  }, {});
}

//Оновлення спроби
export const updateAttempts = (words: string[], attempts: TAttempts) => {
  const attemptIndex = words.findIndex((_, i) => !words[i + 1]) + 1

  const newAttempts = {...attempts}
  newAttempts[attemptIndex] += 1
  
  return newAttempts
}
