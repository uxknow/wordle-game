import { MouseEvent } from "react"

export interface IKeyboardProps {
  handleEnter: () => void
  handleBackspace: () => void
  handlePressedClick: (e: MouseEvent<HTMLDivElement>) => void
  isActiveKey: string
  isBackspaceActive: boolean
  isEnterActive: boolean
}