import { FC, useRef, useState, MouseEvent } from "react";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { CustomModal } from "./Modal";
import { ModalContent } from "../common/types/modal";

export const Header: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [сontent, setContent] = useState<ModalContent.rules | ModalContent.statistic>(
    ModalContent.statistic
  );

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
    <div className="header-container">
      <button ref={ref} onClick={openModal}>
        <MdOutlineHelpOutline className="header-icon icons" />
      </button>
      <CustomModal isOpen={isOpenModal} onClose={closeModal} сontent={сontent} />
      <h1 className="header-title">Wordle</h1>
      <button onClick={openModal}>
        <IoMdStats className="header-icon icons" />
      </button>
    </div>
  );
};
