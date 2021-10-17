import React, { useEffect, useRef, useState } from 'react';
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
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRendered(true);
    }, 300);
  }, []);

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
            'modal-rebound': rebound,
            rendered
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
            outline: none;
            animation-fill-mode: forwards;
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
          .modal-rebound:not(.fullscreen) {
            animation-duration: 250ms;
            animation-name: rebound;
            animation-timing-function: ease;
            animation-fill-mode: forwards;
          }
          .modal-wrapper-enter:not(.rendered) {
            animation-name: appearance-in;
            animation-duration: 200ms;
            animation-timing-function: ease-in;
            animation-direction: normal;
          }
          .modal-wrapper-leave {
            animation-name: appearance-out;
            animation-duration: 50ms;
            animation-timing-function: ease-out;
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
          @keyframes appearance-in {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            60% {
              opacity: 0.75;
              transform: scale(1.02);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes appearance-out {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.95);
            }
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
