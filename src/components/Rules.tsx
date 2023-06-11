import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { IStatisticAndRulesProps } from "../common/types/statistic-rules";

export const Rules: FC<IStatisticAndRulesProps> = ({ onClose }) => {
  return (
    <div className="modal-content-container">
      <header className="modal-header">
        <h2 className="modal-title">Як грати?</h2>
        <button className="modal-close-btn" onClick={onClose}>
          <IoMdClose className="icons" />
        </button>
      </header>
      <main>
        <p>
          <b>Вгадайте слово з шести спроб.</b> Кожна здогадка мусить бути словниковим іменником, але
          не власною назвою. Натисніть кнопку <b>enter</b>, щоб підтвердити спробу. Після кожної
          спроби колір підкаже, наскільки близько ви були:
        </p>
        <div className="game-example-container">
          <div className="row">
            <div className="row-word">
              <div className="word-char">с</div>
              <div className="word-char">т</div>
              <div className="word-char">и</div>
              <div className="word-char">л</div>
              <div className="word-char">ь</div>
            </div>
            <p className="row-text">
              Буква <b>С</b> є в слові саме в цьому місці
            </p>
          </div>
          <div className="row">
            <div className="row-word">
              <div className="word-char">к</div>
              <div className="word-char">о</div>
              <div className="word-char">л</div>
              <div className="word-char">і</div>
              <div className="word-char">р</div>
            </div>
            <p className="row-text">
              Буква <b>Л</b> є в слові, але не в цьому місці
            </p>
          </div>
          <div className="row">
            <div className="row-word">
              <div className="word-char">р</div>
              <div className="word-char">а</div>
              <div className="word-char">н</div>
              <div className="word-char">о</div>
              <div className="word-char">к</div>
            </div>
            <p className="row-text">Жодної з цих букв немає в слові</p>
          </div>
          <p>
            <b>Нове завдання щодня!</b>
          </p>
        </div>
        <br />
        <hr />
      </main>
      <footer>
        <br />
        <p>
          Оригінальна гра:{" "}
          <a
            href="https://www.nytimes.com/games/wordle/index.html"
            target="_blank"
            rel="noreferrer"
          >
            WORDLE
          </a>{" "}
          © Josh Wardle, 2021-22
        </p>
      </footer>
    </div>
  );
};
