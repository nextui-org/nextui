import Modal from './modal';
import ModalHeader from './modal-header';
import ModalBody from './modal-body';
import ModalFooter from './modal-footer';

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export type { ModalProps } from './modal';
export type { ModalHeaderProps } from './modal-header';
export type { ModalBodyProps } from './modal-body';
export type { ModalFooterProps } from './modal-footer';

export {
  StyledModalHideTab,
  StyledModalCloseButton,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
  StyledModal
} from './modal.styles';
export type {
  ModalVariantsProps,
  ModalCloseButtonVariantsProps,
  ModalBodyVariantsProps,
  ModalHeaderVariantsProps,
  ModalFooterVariantsProps
} from './modal.styles';

export default Modal;
