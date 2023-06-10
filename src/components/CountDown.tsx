import { FC, useState, useEffect, useContext } from "react";
import { getEmptyBoard } from "../utils/game-field";
import { getRandomWord } from "../utils/dictionary";
import { FieldContext } from "./FieldContextProvider";
import { IValueContext } from "../common/types/field-context";

export const CountDown: FC = () => {
  const [countdown, setCountdown] = useState("");
  const { fieldInfo } = useContext(FieldContext) as IValueContext;

  const addZero = (number: number) => {
    return number < 10 ? "0" + number : number;
  };

  useEffect(() => {
    const updateCountdown = () => {
      // Обновляем разницу между текущим временем и полуночью
      const now = Date.now();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now;
  
      if (diff <= 1000) {
        localStorage.removeItem('board')
        localStorage.removeItem('result')
        localStorage.removeItem('target')
        localStorage.removeItem('lastWord')
        setCountdown("");
        fieldInfo.setCorrectWord(getRandomWord());
        fieldInfo.setBoard(getEmptyBoard());
        fieldInfo.setWin(false);
      } else {
        const remainingTime = new Date(diff - 1000);
        const hours = remainingTime.getUTCHours();
        const minutes = remainingTime.getUTCMinutes();
        const seconds = remainingTime.getUTCSeconds();
        const formattedTime = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
        setCountdown(formattedTime);
  
        setTimeout(updateCountdown, 1000); // Вызываем функцию обновления каждую секунду
      }
    };
  
    updateCountdown(); // Запускаем обновление времени обратного отсчета
  }, []);

  return <>{countdown}</>;
};

