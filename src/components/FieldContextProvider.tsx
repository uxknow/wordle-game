import { FC, createContext, useState } from "react";
import { IFieldContextProviderProps } from "../common/types/field-context";

export const FieldContext = createContext({});

export const FieldContextProvider: FC<IFieldContextProviderProps> = ({ children }) => {
  const [fieldInfo, setFieldInfo] = useState(null);
  return (
    <FieldContext.Provider value={{ fieldInfo, setFieldInfo }}>{children}</FieldContext.Provider>
  );
};
