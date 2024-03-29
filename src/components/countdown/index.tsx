import { FC, useState, useEffect, useContext } from "react";
import { getEmptyBoard } from "../../utils/game-field";
import { getRandomWord } from "../../utils/dictionary";
import { FieldContext } from "../field-context";
import { IValueContext } from "../../common/types/field-context";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";

export const CountDown: FC = () => {
  const [countdown, setCountdown] = useState("");
  const { fieldInfo } = useContext(FieldContext) as IValueContext;
  const { i18n } = useTranslation();

  const addZero = (number: number) => {
    return number < 10 ? "0" + number : number;
  };

  useEffect(() => {
    const updateCountdown = () => {
      // Обновляем разницу между текущим временем и полуночью
      const now = Date.now();
      const midnight = +(localStorage.getItem("time") as string);
      const diff = midnight - now;


      if (diff <= 1000) {
        localStorage.removeItem("board");
        localStorage.removeItem("result");
        localStorage.removeItem("target");
        localStorage.removeItem("lastWord");
        setCountdown("");
        fieldInfo?.setCorrectWord(getRandomWord(i18n.language));
        fieldInfo?.setBoard(getEmptyBoard());
        fieldInfo?.setWin(false);
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

  return <span className={classes.countdown}>{countdown}</span>;
};
