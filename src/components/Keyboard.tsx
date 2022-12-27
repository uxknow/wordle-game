const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export const buttons = keys.map((letter) => [...letter]);

export const Keyboard = ({ handleBackspace, handlePressed }) => {
  return (
    <div className="keyboard">
      <div className="keys-letters" onClick={handlePressed}>
        {buttons.map((row, idx) => (
          <div key={idx}>
            {row.map((letter) => (
              <button id={letter} key={letter}>
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleBackspace}>Backspace</button>
      </div>
    </div>
  );
};
