import { useState } from "react";
import "./App.scss";
import { buttons } from "./components/Keyboard";
import { Field } from "./components/Field";

function App() {
  const [pressed, setPressed] = useState(null);
  const onPressed = (e) => {
    /*const letter = buttons.map((row) => row.find((letter) => letter === key));
    setPressed(letter);
    console.log(pressed);*/
    const click = e.target.id;
    if (!click) return;

    setPressed(click);
    console.log(click);
  };
  return (
    <div>
      <Field />
    </div>
  );
}

export default App;
