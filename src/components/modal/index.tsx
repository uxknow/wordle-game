import { FC, useContext } from "react";
import Modal from "react-modal";
import { Rules } from "../modal-content/game-rules";
import { Statistic } from "../modal-content/statistic";
import { ICustomModalProps } from "../../common/types/modal";
import { ThemeContext } from "../themeContext";
import { IThemeContext } from "../../common/types/theme-context";
import classesLight from './light.module.scss'
import classesDark from './dark.module.scss'

export const CustomModal: FC<ICustomModalProps> = ({ isOpen, onClose, сontent }) => {
  const {theme: themeName} = useContext(ThemeContext) as IThemeContext
  const theme = themeName === 'dark' ? classesDark : classesLight
 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={800}
      className={theme.modal}
      bodyOpenClassName={theme['modal-body--open']}
      overlayClassName={{ base: theme.overlay, afterOpen: theme['after-open'], beforeClose: theme['before-close'] }}
    >
      {сontent === "rules" ? <Rules onClose={onClose} /> : <Statistic onClose={onClose} />}
    </Modal>
  );
};
