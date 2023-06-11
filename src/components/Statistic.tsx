import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { CountDown } from "./CountDown";
import { IStats } from "../common/types/field";
import { IStatisticAndRulesProps } from "../common/types/statistic-rules";
import { getWidthToGraphBar } from "../utils/statistic";
import { decodedWord } from "../utils/encodeWord";

export const Statistic: FC<IStatisticAndRulesProps> = ({ onClose }) => {
  const { games, won, attempts } = JSON.parse(localStorage.getItem("stats") as string) as IStats;
  const percent = won ? ((won * 100) / games).toFixed(1) : 0;
  const word = decodedWord(localStorage.getItem("target") as string);

  //Отримуємо ширину для кожного графік-бару
  const width = getWidthToGraphBar(attempts);

  return (
    <div>
      <header className="modal-header">
        <h2 className="modal-title">Статистика</h2>
        <button className="modal-close-btn" onClick={onClose}>
          <IoMdClose className="icons" />
        </button>
      </header>
      <main className="statistic-content">
        {localStorage.getItem("result") === "won" && (
          <p className="statistic-text-message message--green">Вітаю! Ви виграли, так тримати.</p>
        )}
        {localStorage.getItem("result") === "lost" && (
          <p className="statistic-text-message message--red">
            На жаль ви програли, можливо наступного разу пощастить. Правильне слово -{" "}
            <b>{word.toUpperCase()}</b>
          </p>
        )}
        <div className="statistic-stat-block">
          <div className="statistic-cols">
            <span className="statistic-stat">{games}</span>
            <span>Зіграно</span>
          </div>
          <div className="statistic-cols">
            <span className="statistic-stat">{percent}%</span>
            <span>Виграно {won}</span>
          </div>
        </div>
        <div className="statisctic-graph">
          <h2 className="graph-title">Виграшні спроби</h2>
          {Object.entries(attempts).map(([attempt, count], i) => (
            <div key={attempt} className="graph-row">
              <span className="graph-label">{attempt}</span>
              <div className="bar-container">
                <div
                  className={`graph-line ${count > 0 ? "graph--green" : "graph--gray"}`}
                  style={{ width: `${width[i] > 0 ? width[i] + "%" : ""}` }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
        {localStorage.getItem("result") && (
          <p className="statistic-countdown">
            Наступне слово через <CountDown />
          </p>
        )}
      </main>
    </div>
  );
};
