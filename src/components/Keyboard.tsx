const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export const buttons = keys.map((letter) => [...letter]);

export const Keyboard = ({ handleBackspace, handlePressedClick, isActiveKey, isBackspace }) => {
  return (
    <div className="keyboard">
      <div className="keys-letters" onClick={handlePressedClick}>
        {buttons.map((row, idx) => (
          <div key={idx}>
            {row.map((letter) => (
              <button
                className={`button ${isActiveKey === letter ? "active" : ""}`}
                id={letter}
                key={letter}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleBackspace} className={isBackspace ? "active" : ""}>
          Backspace
        </button>
      </div>
    </div>
  );
};
