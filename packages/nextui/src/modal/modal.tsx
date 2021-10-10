import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../use-portal';
import ModalWrapper from './modal-wrapper';
import ModalBody from './modal-body';
import ModalHeader from './modal-header';
import ModalFooter from './modal-footer';
import Backdrop from '../backdrop';
import { ModalConfig, ModalContext } from './modal-context';
import useBodyScroll from '../use-body-scroll';
import useCurrentState from '../use-current-state';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { __DEV__ } from '../utils/assertion';

interface Props {
  onOpen?: () => void;
  open?: boolean;
  scroll?: boolean;
  closeButton?: boolean;
  fullScreen?: boolean;
  autoMargin?: boolean;
  escapeClose?: boolean;
  width?: string;
  disableBackdropClick?: boolean;
  onClose?: () => void;
  className?: string;
}

const defaultProps = {
  width: '400px',
  className: '',
  disableBackdropClick: false,
  escapeClose: true,
  fullScreen: false,
  closeButton: false,
  scroll: false
};

type NativeAttrs = Omit<React.DialogHTMLAttributes<unknown>, keyof Props>;
export type ModalProps = Props & typeof defaultProps & NativeAttrs;

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  disableBackdropClick,
  onClose,
  onOpen,
  open,
  autoMargin,
  width: wrapperWidth,
  className,
  escapeClose,
  fullScreen,
  ...props
}) => {
  const portal = usePortal('modal');
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(false);

  const closeModal = () => {
    onClose && onClose();
    setVisible(false);
    setBodyHidden(false);
  };

  useEffect(() => {
    if (open === undefined) return;
    if (open) {
      onOpen && onOpen();
    }
    if (!open && visibleRef.current) {
      onClose && onClose();
    }

    setVisible(open);
    setBodyHidden(open);
  }, [open]);

  const { bindings } = useKeyboard(
    () => {
      escapeClose && closeModal();
    },
    KeyCode.Escape,
    {
      disableGlobalEvent: true
    }
  );

  const closeFromBackdrop = () => {
    if (disableBackdropClick) return;
    closeModal();
  };

  const modalConfig: ModalConfig = useMemo(
    () => ({
      close: closeModal,
      autoMargin
    }),
    []
  );

  if (!portal) return null;
  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Backdrop
        onClick={closeFromBackdrop}
        visible={visible}
        width={wrapperWidth}
        fullScreenContent={fullScreen}
        {...bindings}
      >
        <ModalWrapper
          visible={visible}
          onCloseButtonClick={closeModal}
          className={className}
          fullScreen={fullScreen}
          {...props}
        >
          {children}
        </ModalWrapper>
      </Backdrop>
    </ModalContext.Provider>,
    portal
  );
};

type ModalComponent<P = {}> = React.FC<P> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

if (__DEV__) {
  Backdrop.displayName = 'NextUI - Modal';
}

Modal.defaultProps = defaultProps;

export default Modal as ModalComponent<ComponentProps>;
