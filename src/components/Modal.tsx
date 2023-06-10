import { FC } from "react";
import Modal from "react-modal";
import { Rules } from "./Rules";
import { Statistic } from "./Statistic";
import { ICustomModalProps } from "../common/types/modal";

export const CustomModal: FC<ICustomModalProps> = ({ isOpen, onClose, сontent }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={800}
      className="modal"
      bodyOpenClassName="modal-body--open"
      overlayClassName={{ base: "overlay", afterOpen: "after-open", beforeClose: "before-close" }}
    >
      {сontent === "rules" ? <Rules onClose={onClose} /> : <Statistic onClose={onClose} />}
    </Modal>
  );
};
