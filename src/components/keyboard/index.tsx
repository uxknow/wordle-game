import { FC } from "react";
import { HiOutlineBackspace } from "react-icons/hi";
import { buttons } from "../../utils/keyboard";
import { IKeyboardProps } from "../../common/types/keyboard";
import classes from './styles.module.scss'

export const Keyboard: FC<IKeyboardProps> = ({
  handleEnter,
  handleBackspace,
  handlePressedClick,
  isActiveKey,
  isBackspaceActive,
  isEnterActive,
}) => {

  return (
    <footer>
      <div className={classes.container}>
        <div className={classes['keys-block']} onClick={handlePressedClick}>
          {buttons.map((row, idx) => (
            <div className={classes.row} key={idx}>
              {idx === 2 && (
                <button
                  onClick={handleEnter}
                  className={`${classes['action-btn']} ${isEnterActive ? classes.active : ""}`}
                >
                  Enter
                </button>
              )}
              {row.map((letter) => (
                <button
                  className={`${classes.btn} ${isActiveKey === letter ? classes.active : ""}`}
                  id={letter}
                  key={letter}
                >
                  {letter}
                </button>
              ))}
              {idx === 2 && (
                <button
                  onClick={handleBackspace}
                  className={`${classes['action-btn']} ${isBackspaceActive ? classes.active : ""}`}
                >
                  <HiOutlineBackspace size={24}/>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
