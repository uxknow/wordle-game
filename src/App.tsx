import { ToastContainer } from "react-toastify";
import { Field } from "./components/field";
import { FieldContextProvider } from "./components/field-context";
import { Header } from "./components/header";
import Modal from "react-modal";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import {ThemeProvider } from "./components/themeContext";

Modal.setAppElement(document.getElementById("root"));

function App() {
  return (
    <FieldContextProvider>
      <ThemeProvider>
        <Header />
        <Field />
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          autoClose={2000}
          theme="dark" //{localStorage.getItem('theme') as string || 'dark'}
        />
      </ThemeProvider>
    </FieldContextProvider>
  );
}

export default App;
