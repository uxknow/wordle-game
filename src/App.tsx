import { ToastContainer } from "react-toastify";
import { Field } from "./components/Field";
import { FieldContextProvider } from "./components/FieldContextProvider";
import { Header } from "./components/Header";
import Modal from "react-modal";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement(document.getElementById("root"));

function App() {
  return (
    <FieldContextProvider>
      <Header />
      <Field />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={2000}
        theme="dark"
      />
    </FieldContextProvider>
  );
}

export default App;
