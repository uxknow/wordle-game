import { FC, useRef, useState, MouseEvent } from "react";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { CustomModal } from "../modal";
import { ModalContent } from "../../common/types/modal";
import classes from './styles.module.scss'

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
    <div className={classes.container}>
      <button ref={ref} onClick={openModal}>
        <MdOutlineHelpOutline className={classes.icon} />
      </button>
      <CustomModal isOpen={isOpenModal} onClose={closeModal} сontent={сontent} />
      <h1 className={classes.title}>Wordle</h1>
      <div>
        <button onClick={openModal}>
          <IoMdStats className={classes.icon} />
        </button>
      </div>
    </div>
  );
};
