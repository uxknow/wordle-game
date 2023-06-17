import { ToastContainer } from "react-toastify";
import { Field } from "./components/field";
import { FieldContextProvider } from "./components/field-context";
import { Header } from "./components/header";
import Modal from "react-modal";
import { ThemeContext } from "./components/themeContext";
import { useContext, Suspense } from "react";
import { IThemeContext } from "./common/types/theme-context";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement(document.getElementById("root"));

function App() {
  const { theme } = useContext(ThemeContext) as IThemeContext;

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <FieldContextProvider>
          <Header />
          <Field />
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            autoClose={2000}
            theme={theme === "dark" ? "light" : "dark"}
          />
        </FieldContextProvider>
       </Suspense>
  );
}

export default App;
