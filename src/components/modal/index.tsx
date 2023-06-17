import { FC, useContext } from "react";
import Modal from "react-modal";
import { Rules } from "../modal-content/game-rules";
import { Statistic } from "../modal-content/statistic";
import { ICustomModalProps, ModalContent } from "../../common/types/modal";
import { ThemeContext } from "../themeContext";
import { IThemeContext } from "../../common/types/theme-context";
import classesLight from './light.module.scss'
import classesDark from './dark.module.scss'
import { Settings } from "../modal-content/settings";

export const CustomModal: FC<ICustomModalProps> = ({ isOpen, onClose, content }) => {
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
      {content === ModalContent.rules ? <Rules onClose={onClose} /> : content === ModalContent.statistic ? <Statistic onClose={onClose} /> : <Settings onClose={onClose}/>}
    </Modal>
  );
};
