export enum ModalContent {
  rules = 'rules',
  statistic = 'statistic',
  settings = 'settings'
}

export interface ICustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: keyof typeof ModalContent;
}
