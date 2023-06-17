import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { IModalContentProps } from "../../../common/types/modal-content";
import { useTranslation } from "react-i18next";
import { parseBoldText } from "../../../utils/i18n/parseText";
import classes from "./styles.module.scss";
import headerClasses from "../styles.module.scss";

export const Rules: FC<IModalContentProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <header className={headerClasses.header}>
        <h2 className={headerClasses.title}>{t("rules.title")}</h2>
        <button className={headerClasses.btn} onClick={onClose}>
          <IoMdClose />
        </button>
      </header>
      <main>
        {parseBoldText(t("rules.description"))}
        <div className={classes["rules-block"]}>
          <div className={classes.row}>
            <div className={classes["row-word"]}>
              {t("rules.wordExample1")
                .split("")
                .map((char, idx) => (
                  <div key={idx} className={classes["word-char"]}>
                    {char}
                  </div>
                ))}
            </div>
            <p className={classes["row-text"]}>{parseBoldText(t("rules.wordDesc1"))}</p>
          </div>
          <div className={classes.row}>
            <div className={classes["row-word"]}>
              {t("rules.wordExample2")
                .split("")
                .map((char, idx) => (
                  <div key={idx} className={classes["word-char"]}>
                    {char}
                  </div>
                ))}
            </div>
            <p className={classes["row-text"]}>{parseBoldText(t("rules.wordDesc2"))}</p>
          </div>
          <div className={classes.row}>
            <div className={classes["row-word"]}>
              {t("rules.wordExample3")
                .split("")
                .map((char, idx) => (
                  <div key={idx} className={classes["word-char"]}>
                    {char}
                  </div>
                ))}
            </div>
            <p className={classes["row-text"]}>{parseBoldText(t("rules.wordDesc3"))}</p>
          </div>
          <p>
            <b>{t("rules.info")}</b>
          </p>
        </div>
        <br />
        <hr />
      </main>
      <footer>
        <br />
        <p>
          {t("rules.footerText")}{" "}
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
