import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { CountDown } from "../../countdown";
import { IStats } from "../../../common/types/field";
import { IStatisticAndRulesProps } from "../../../common/types/statistic-rules";
import { getWidthToGraphBar } from "../../../utils/statistic";
import { decodedWord } from "../../../utils/encodeWord";
import classes from "./styles.module.scss";
import headerClasses from '../styles.module.scss'

export const Statistic: FC<IStatisticAndRulesProps> = ({ onClose }) => {
  const { games, won, attempts } = JSON.parse(localStorage.getItem("stats") as string) as IStats;
  const percent = won ? ((won * 100) / games).toFixed(1) : 0;
  const word = decodedWord(localStorage.getItem("target") as string);

  //Отримуємо ширину для кожного графік-бару
  const width = getWidthToGraphBar(attempts);

  return (
    <>
      <header className={headerClasses.header}>
        <h2 className={headerClasses.title}>Статистика</h2>
        <button className={headerClasses.btn} onClick={onClose}>
          <IoMdClose />
        </button>
      </header>
      <main className={classes["statistic-block"]}>
        {localStorage.getItem("result") === "won" && (
          <p className={`${classes["text-msg"]} ${classes["msg--green"]}`}>
            Вітаю! Ви виграли, так тримати.
          </p>
        )}
        {localStorage.getItem("result") === "lost" && (
          <p className={`${classes["text-msg"]} ${classes["msg--red"]}`}>
            На жаль ви програли, можливо наступного разу пощастить. Правильне слово -{" "}
            <b>{word.toUpperCase()}</b>
          </p>
        )}
        <div className={classes["stat-block"]}>
          <div className={classes["stat-col"]}>
            <span className={classes["stat-value"]}>{games}</span>
            <span>Зіграно</span>
          </div>
          <div className={classes["stat-col"]}>
            <span className={classes["stat-value"]}>{percent}%</span>
            <span>Виграно {won}</span>
          </div>
        </div>
        <div className={classes["graph-block"]}>
          <h2 className={classes["graph-title"]}>Виграшні спроби</h2>
          {Object.entries(attempts).map(([attempt, count], i) => (
            <div key={attempt} className={classes["graph-row"]}>
              <span className={classes["graph-label"]}>{attempt}</span>
              <div className={classes["bar-container"]}>
                <div
                  className={`${classes["graph-line"]} ${
                    count > 0 ? classes["line--green"] : classes["line--gray"]
                  }`}
                  style={{ width: `${width[i] > 0 ? width[i] + "%" : ""}` }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
        {localStorage.getItem("result") && (
          <p className={classes.countdown}>
            Наступне слово через <CountDown />
          </p>
        )}
      </main>
    </>
  );
};
