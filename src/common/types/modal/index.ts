export enum ModalContent {
  rules = 'rules',
  statistic = 'statistic'
}

export interface ICustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  сontent?: keyof typeof ModalContent;
}
