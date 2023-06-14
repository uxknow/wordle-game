import { FC, useRef, useState, MouseEvent, useContext } from "react";
import { MdOutlineHelpOutline, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { CustomModal } from "../modal";
import { ModalContent } from "../../common/types/modal";
import classes from "./styles.module.scss";
import { ThemeContext } from "../themeContext";
import { IThemeContext } from "../../common/types/theme-context";

export const Header: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [сontent, setContent] = useState<ModalContent.rules | ModalContent.statistic>(
    ModalContent.statistic
  );

  const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext;

  const ref = useRef<HTMLButtonElement>(null);

  const openModal = (event: MouseEvent<HTMLButtonElement>) => {
    if (ref.current?.contains(event?.target as Node)) {
      setContent(ModalContent.rules);
    } else {
      setContent(ModalContent.statistic);
    }
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={classes.container}>
      <button ref={ref} onClick={openModal}>
        <MdOutlineHelpOutline className={classes.icon} />
      </button>
      <CustomModal isOpen={isOpenModal} onClose={closeModal} сontent={сontent} />
      <h1 className={classes.title}>Wordle</h1>
      <div className={classes["btn-block"]}>
        <button onClick={openModal}>
          <IoMdStats className={classes.icon} />
        </button>
        <button onClick={toggleTheme}>
          {theme === "dark" ? (
            <MdDarkMode className={classes.icon} />
          ) : (
            <MdLightMode className={classes.icon} />
          )}
        </button>
      </div>
    </div>
  );
};
