import {forwardRef} from "@nextui-org/system";
import {ReactNode} from "react";
import {AnimatePresence} from "framer-motion";
import {Overlay} from "@react-aria/overlays";

import {UseModalProps, useModal} from "./use-modal";
import {ModalProvider} from "./modal-context";

export interface ModalProps extends Omit<UseModalProps, "ref"> {
  /**
   * The content of the modal. Usually the ModalContent
   */
  children: ReactNode;
}

const Modal = forwardRef<ModalProps, "section">((props, ref) => {
  const {children, ...otherProps} = props;
  const context = useModal({ref, ...otherProps});

  const overlay = <Overlay>{children}</Overlay>;

  return (
    <ModalProvider value={context}>
      {context.disableAnimation && context.isOpen ? (
        overlay
      ) : (
        <AnimatePresence initial={false}>{context.isOpen ? overlay : null}</AnimatePresence>
      )}
    </ModalProvider>
  );
});

Modal.displayName = "NextUI.Modal";

export default Modal;
