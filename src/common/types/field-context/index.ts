import {ReactNode} from 'react'
import { TBoard } from '../field'

interface IField {
  setWin: React.Dispatch<React.SetStateAction<boolean>>
  setCorrectWord: React.Dispatch<React.SetStateAction<string | undefined>>
  setBoard:React.Dispatch<React.SetStateAction<TBoard>>
}

export interface IValueContext {
  fieldInfo: IField,
  setFieldInfo: React.Dispatch<React.SetStateAction<{}>>
}


export interface IFieldContextProviderProps {
  children: ReactNode;
  value?: IValueContext
}