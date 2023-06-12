import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { IStatisticAndRulesProps } from "../../../common/types/statistic-rules";
import classes from "./styles.module.scss";
import headerClasses from '../styles.module.scss'

export const Rules: FC<IStatisticAndRulesProps> = ({ onClose }) => {
  return (
    <>
      <header className={headerClasses.header}>
        <h2 className={headerClasses.title}>Як грати?</h2>
        <button className={headerClasses.btn} onClick={onClose}>
          <IoMdClose />
        </button>
      </header>
      <main>
        <p>
          <b>Вгадайте слово з шести спроб.</b> Кожна здогадка мусить бути словниковим іменником, але
          не власною назвою. Натисніть кнопку <b>enter</b>, щоб підтвердити спробу. Після кожної
          спроби колір підкаже, наскільки близько ви були:
        </p>
        <div className={classes["rules-block"]}>
          <div className={classes.row}>
            <div className={classes["row-word"]}>
              <div className={classes["word-char"]}>с</div>
              <div className={classes["word-char"]}>т</div>
              <div className={classes["word-char"]}>и</div>
              <div className={classes["word-char"]}>л</div>
              <div className={classes["word-char"]}>ь</div>
            </div>
            <p className={classes["row-text"]}>
              Буква <b>С</b> є в слові саме в цьому місці
            </p>
          </div>
          <div className={classes.row}>
            <div className={classes["row-word"]}>
              <div className={classes["word-char"]}>к</div>
              <div className={classes["word-char"]}>о</div>
              <div className={classes["word-char"]}>л</div>
              <div className={classes["word-char"]}>і</div>
              <div className={classes["word-char"]}>р</div>
            </div>
            <p className={classes["row-text"]}>
              Буква <b>Л</b> є в слові, але не в цьому місці
            </p>
          </div>
          <div className={classes.row}>
            <div className={classes["row-word"]}>
              <div className={classes["word-char"]}>р</div>
              <div className={classes["word-char"]}>а</div>
              <div className={classes["word-char"]}>н</div>
              <div className={classes["word-char"]}>о</div>
              <div className={classes["word-char"]}>к</div>
            </div>
            <p className={classes["row-text"]}>Жодної з цих букв немає в слові</p>
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
    </>
  );
};
