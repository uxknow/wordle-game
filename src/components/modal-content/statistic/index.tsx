import { FC, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { CountDown } from "../../countdown";
import { IStats } from "../../../common/types/field";
import { IStatisticAndRulesProps } from "../../../common/types/statistic-rules";
import { getWidthToGraphBar } from "../../../utils/statistic";
import { decodedWord } from "../../../utils/encodeWord";
import { ThemeContext } from "../../themeContext";
import { IThemeContext } from "../../../common/types/theme-context";
import classesLight from "./light.module.scss";
import classesDark from './dark.module.scss';
import headerClasses from "../styles.module.scss";

export const Statistic: FC<IStatisticAndRulesProps> = ({ onClose }) => {
  const stats = JSON.parse(localStorage.getItem("stats") as string) as IStats;
  const { games, won, attempts } = stats || {};
  const percent = won ? ((won * 100) / games).toFixed(1) : 0;
  const word = decodedWord(localStorage.getItem("target") as string);

  //Отримуємо ширину для кожного графік-бару
  const width = getWidthToGraphBar(attempts) as number[];

  const {theme: themeName} = useContext(ThemeContext) as IThemeContext
  const theme = themeName === 'dark' ? classesDark : classesLight
 

  return (
    <>
      <header className={headerClasses.header}>
        <h2 className={headerClasses.title}>Статистика</h2>
        <button className={headerClasses.btn} onClick={onClose}>
          <IoMdClose />
        </button>
      </header>
      <main className={theme["statistic-block"]}>
        {localStorage.getItem("result") === "won" && (
          <p className={`${theme["text-msg"]} ${theme["msg--green"]}`}>
            Вітаю! Ви виграли, так тримати.
          </p>
        )}
        {localStorage.getItem("result") === "lost" && (
          <p className={`${theme["text-msg"]} ${theme["msg--red"]}`}>
            На жаль ви програли, можливо наступного разу пощастить. Правильне слово -{" "}
            <b>{word.toUpperCase()}</b>
          </p>
        )}
        <div className={theme["stat-block"]}>
          <div className={theme["stat-col"]}>
            <span className={theme["stat-value"]}>{games || 0}</span>
            <span>Зіграно</span>
          </div>
          <div className={theme["stat-col"]}>
            <span className={theme["stat-value"]}>{percent}%</span>
            <span>Виграно {won}</span>
          </div>
        </div>
        <div className={theme["graph-block"]}>
          <h2 className={theme["graph-title"]}>Виграшні спроби</h2>
          {attempts ? (
            Object.entries(attempts).map(([attempt, count], i) => (
              <div key={attempt} className={theme["graph-row"]}>
                <span className={theme["graph-label"]}>{attempt}</span>
                <div className={theme["bar-container"]}>
                  <div
                    className={`${theme["graph-line"]} ${
                      count > 0 ? theme["line--green"] : theme["line--gray"]
                    }`}
                    style={{ width: `${width[i] > 0 ? width[i] + "%" : ""}` }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={theme['nodata-msg']}>Немає данних</p>
          )}
        </div>
        {localStorage.getItem("result") && (
          <p className={theme.countdown}>
            Наступне слово через <CountDown />
          </p>
        )}
      </main>
    </>
  );
};
