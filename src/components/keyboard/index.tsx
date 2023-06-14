import { FC, useContext } from "react";
import { HiOutlineBackspace } from "react-icons/hi";
import { buttons } from "../../utils/keyboard";
import { IKeyboardProps } from "../../common/types/keyboard";
import classesLight from './light.module.scss'
import classesDark from './dark.module.scss'
import { ThemeContext } from "../themeContext";
import { IThemeContext } from "../../common/types/theme-context";

export const Keyboard: FC<IKeyboardProps> = ({
  handleEnter,
  handleBackspace,
  handlePressedClick,
  isActiveKey,
  isBackspaceActive,
  isEnterActive,
}) => {
  const {theme: themeName} = useContext(ThemeContext) as IThemeContext
  const theme = themeName === 'dark' ? classesDark : classesLight
 
  return (
    <footer>
      <div className={theme.container}>
        <div className={theme['keys-block']} onClick={handlePressedClick}>
          {buttons.map((row, idx) => (
            <div className={theme.row} key={idx}>
              {idx === 2 && (
                <button
                  onClick={handleEnter}
                  className={`${theme['action-btn']} ${isEnterActive ? theme.active : ""}`}
                >
                  Enter
                </button>
              )}
              {row.map((letter) => (
                <button
                  className={`${theme.btn} ${isActiveKey === letter ? theme.active : ""}`}
                  id={letter}
                  key={letter}
                >
                  {letter}
                </button>
              ))}
              {idx === 2 && (
                <button
                  onClick={handleBackspace}
                  className={`${theme['action-btn']} ${isBackspaceActive ? theme.active : ""}`}
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
