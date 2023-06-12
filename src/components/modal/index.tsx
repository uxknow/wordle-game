import { FC } from "react";
import Modal from "react-modal";
import { Rules } from "../modal-content/game-rules";
import { Statistic } from "../modal-content/statistic";
import { ICustomModalProps } from "../../common/types/modal";
import classes from './styles.module.scss'

export const CustomModal: FC<ICustomModalProps> = ({ isOpen, onClose, сontent }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={800}
      className={classes.modal}
      bodyOpenClassName={classes['modal-body--open']}
      overlayClassName={{ base: classes.overlay, afterOpen: classes['after-open'], beforeClose: classes['before-close'] }}
    >
      {сontent === "rules" ? <Rules onClose={onClose} /> : <Statistic onClose={onClose} />}
    </Modal>
  );
};
