import React, { useEffect, useRef } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import { isChildElement } from '../utils/collections';
import cslx from '../utils/clsx';

interface Props {
  className?: string;
  visible?: boolean;
  scroll?: boolean;
  fullScreen?: boolean;
}

const defaultProps = {
  className: '',
  visible: false
};

export type ModalWrapperProps = Props & typeof defaultProps;

const ModalWrapper: React.FC<React.PropsWithChildren<ModalWrapperProps>> = ({
  className,
  children,
  visible,
  fullScreen,
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

  return (
    <CSSTransition name="wrapper" visible={visible} clearTime={300}>
      <div
        className={cslx('wrapper', { 'full-screen': fullScreen }, className)}
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
        {children}
        <div
          tabIndex={0}
          className="hide-tab"
          aria-hidden="true"
          ref={tabEnd}
        />
        <style jsx>{`
          .wrapper {
            max-width: 100%;
            vertical-align: middle;
            overflow: hidden;
            height: fit-content(20em);
            max-height: ${scroll ? 'calc(100vh - 200px)' : 'inherit'};
            display: flex;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
            opacity: 0;
            outline: none;
            transform: translate3d(0px, 15px, 0px) scale(0.9);
            transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s,
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s;
          }
          .wrapper-enter {
            opacity: 0;
            transform: translate3d(0px, 15px, 0px) scale(0.9);
          }
          .wrapper-enter-active {
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          .wrapper-leave {
            opacity: 1;
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          .wrapper-leave-active {
            opacity: 0;
            transform: translate3d(0px, 15px, 0px) scale(0.9);
          }
          .hide-tab {
            outline: none;
            overflow: hidden;
            width: 0;
            height: 0;
            opacity: 0;
          }
          .full-screen {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    </CSSTransition>
  );
};

export default withDefaults(ModalWrapper, defaultProps);
