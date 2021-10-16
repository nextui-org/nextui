import React, { useEffect, useRef } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import { isChildElement } from '../utils/collections';
import ModalCloseButton from './modal-close-button';
import cslx from '../utils/clsx';

interface Props {
  className?: string;
  visible?: boolean;
  scroll?: boolean;
  rebound?: boolean;
  onCloseButtonClick?: () => void;
  fullScreen?: boolean;
  closeButton?: boolean;
}

const defaultProps = {
  className: '',
  visible: false,
  rebound: false
};

export type ModalWrapperProps = Props & typeof defaultProps;

const ModalWrapper: React.FC<React.PropsWithChildren<ModalWrapperProps>> = ({
  className,
  children,
  visible,
  fullScreen,
  closeButton,
  rebound,
  onCloseButtonClick,
  scroll,
  ...props
}) => {
  const theme = useTheme();
  const modalContent = useRef<HTMLDivElement>(null);
  const tabStart = useRef<HTMLDivElement>(null);
  const tabEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const activeElement = document.activeElement;
    const isChild = isChildElement(modalContent.current, activeElement);
    if (isChild) return;
    tabStart.current && tabStart.current.focus();
  }, [visible]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isTabDown = event.keyCode === 9;
    if (!visible || !isTabDown) return;
    const activeElement = document.activeElement;
    if (event.shiftKey) {
      if (activeElement === tabStart.current) {
        tabEnd.current && tabEnd.current.focus();
      }
    } else {
      if (activeElement === tabEnd.current) {
        tabStart.current && tabStart.current.focus();
      }
    }
  };

  const handleClose = () => {
    onCloseButtonClick && onCloseButtonClick();
  };

  return (
    <CSSTransition
      name="modal-wrapper"
      visible={visible}
      enterTime={20}
      leaveTime={20}
      clearTime={300}
    >
      <div
        className={cslx(
          'modal-wrapper',
          {
            fullscreen: fullScreen,
            'with-close-button': closeButton,
            'modal-rebound': rebound
          },
          className
        )}
        role="dialog"
        aria-modal={visible}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        ref={modalContent}
        {...props}
      >
        <div
          tabIndex={0}
          className="hide-tab"
          aria-hidden="true"
          ref={tabStart}
        />
        {closeButton && <ModalCloseButton onClick={handleClose} />}
        {children}
        <div
          tabIndex={0}
          className="hide-tab"
          aria-hidden="true"
          ref={tabEnd}
        />
        <style jsx>{`
          .modal-wrapper {
            max-width: 100%;
            vertical-align: middle;
            overflow: hidden;
            height: fit-content(20em);
            max-height: ${scroll ? 'calc(100vh - 200px)' : 'inherit'};
            display: flex;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
            background-color: ${theme.type === 'light'
              ? theme.palette.background
              : theme.palette.accents_1};
            color: ${theme.palette.foreground};
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
            opacity: 0;
            outline: none;
            transform: translate3d(0px, 20px, 0px) scale(1.02);
            transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s,
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s;
          }
          .modal-rebound:not(.fullscreen) {
            animation: rebound 0.25s ease;
          }
          .modal-wrapper-enter {
            opacity: 0;
            transform: translate3d(0px, 20px, 0px) scale(1.02);
          }
          .modal-wrapper-enter-active {
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          .modal-wrapper-leave {
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          .modal-wrapper-leave-active {
            opacity: 0;
            transform: translate3d(0px, 20px, 0px) scale(1.02);
          }
          .hide-tab {
            outline: none;
            overflow: hidden;
            width: 0;
            height: 0;
            opacity: 0;
          }
          .fullscreen {
            width: 100%;
            height: 100%;
            max-height: 100%;
          }
          .with-close-button {
            padding-top: ${theme.layout.gap};
          }
          .fullscreen :global(.close-icon) {
            top: ${theme.layout.gap};
            right: calc(${theme.layout.gap} * 0.5);
          }
          .fullscreen :global(.close-icon svg) {
            width: 24px;
            height: 24px;
          }
          @keyframes rebound {
            0% {
              transform: scale(0.95);
            }
            40% {
              transform: scale(1.02);
            }
            80% {
              transform: scale(0.98);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </CSSTransition>
  );
};

export default withDefaults(ModalWrapper, defaultProps);
