import { FC, useState, useEffect } from "react";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoMdStats, IoMdSettings } from "react-icons/io";
import { CustomModal } from "../modal";
import { ModalContent } from "../../common/types/modal";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import classes from "./styles.module.scss";

export const Header: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [content, setContent] = useState<
    ModalContent.rules | ModalContent.statistic | ModalContent.settings
  >(ModalContent.statistic);
  const { i18n } = useTranslation();

  const openModal = (
    content: ModalContent.rules | ModalContent.statistic | ModalContent.settings
  ) => {
    setContent(content);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);

    const isDarkTheme = document.body.classList.contains("dark");
    if (isDarkTheme) {
      document.body.className = "dark";
    } else {
      document.body.className = "";
    }
  };

  //встановлення початкової мови
  useEffect(() => {
    if (
      localStorage.getItem("i18nextLng") !== "en" &&
      localStorage.getItem("i18nextLng") !== "ua"
    ) {
      i18n.changeLanguage("ua");
      localStorage.setItem("i18nextLng", "ua");
    } 
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes["btn-block"]}>
        <button onClick={() => openModal(ModalContent.rules)}>
          <MdOutlineHelpOutline className={classes.icon} />
        </button>
        {i18n.language === "en" ? (
          <ReactCountryFlag svg countryCode="GB" />
        ) : (
          <ReactCountryFlag svg countryCode="UA" />
        )}
      </div>
      <CustomModal isOpen={isOpenModal} onClose={closeModal} content={content} />
      <h1 className={classes.title}>Wordle</h1>
      <div className={classes["btn-block"]}>
        <button onClick={() => openModal(ModalContent.statistic)}>
          <IoMdStats className={classes.icon} />
        </button>
        <button onClick={() => openModal(ModalContent.settings)}>
          <IoMdSettings className={classes.icon} />
        </button>
      </div>
    </div>
  );
};
