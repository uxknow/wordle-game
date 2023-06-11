import { FC } from "react";
import { HiOutlineBackspace } from "react-icons/hi";
import { buttons } from "../utils/keyboard";
import { IKeyboardProps } from "../common/types/keyboard";

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
      <div className="keyboard">
        <div className="keys-letters" onClick={handlePressedClick}>
          {buttons.map((row, idx) => (
            <div className="row-btn-block" key={idx}>
              {idx === 2 && (
                <button
                  onClick={handleEnter}
                  className={`action-btn ${isEnterActive ? "active" : ""}`}
                >
                  Enter
                </button>
              )}
              {row.map((letter) => (
                <button
                  className={`button ${isActiveKey === letter ? "active" : ""}`}
                  id={letter}
                  key={letter}
                >
                  {letter}
                </button>
              ))}
              {idx === 2 && (
                <button
                  onClick={handleBackspace}
                  className={`action-btn ${isBackspaceActive ? "active" : ""}`}
                >
                  <HiOutlineBackspace size={24} color="#000000"/>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
