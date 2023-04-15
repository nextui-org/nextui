import {forwardRef} from "@nextui-org/system";
import {Children, ReactNode} from "react";
import {AnimatePresence} from "framer-motion";
import {Overlay} from "@react-aria/overlays";

import {UseModalProps, useModal} from "./use-modal";
import {ModalProvider} from "./modal-context";

export interface ModalProps extends Omit<UseModalProps, "ref"> {
  /**
   * The content of the popover. It is usually the `ModalTrigger`,
   * and `ModalContent`
   */
  children: ReactNode[];
}

const Modal = forwardRef<ModalProps, "section">((props, ref) => {
  const {children, ...otherProps} = props;
  const context = useModal({ref, ...otherProps});

  const [trigger, content] = Children.toArray(children);

  const overlay = <Overlay>{content}</Overlay>;

  return (
    <ModalProvider value={context}>
      {trigger}
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
