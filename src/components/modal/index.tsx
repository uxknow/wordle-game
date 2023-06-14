import { FC } from "react";
import Modal from "react-modal";
import { Rules } from "../modal-content/game-rules";
import { Statistic } from "../modal-content/statistic";
import { ICustomModalProps } from "../../common/types/modal";
import classesLight from './light.module.scss'
import classesDark from './dark.module.scss'

export const CustomModal: FC<ICustomModalProps> = ({ isOpen, onClose, сontent }) => {
  const theme = localStorage.getItem('theme') === 'light' ? classesLight : classesDark

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
