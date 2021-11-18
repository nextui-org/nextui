import React, { useEffect, useRef, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import { isChildElement } from '../utils/collections';
import ModalCloseButton from './modal-close-button';
import { KeyCode } from '../use-keyboard';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import cslx from '../utils/clsx';

interface Props extends DefaultProps {
  className?: string;
  visible?: boolean;
  scroll?: boolean;
  rebound?: boolean;
  animated?: boolean;
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

const preClass = 'nextui-modal';

const ModalWrapper: React.FC<React.PropsWithChildren<ModalWrapperProps>> = ({
  className,
  children,
  visible,
  fullScreen,
  closeButton,
  rebound,
  animated,
  onCloseButtonClick,
  scroll,
  ...props
}) => {
  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

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
    const isTabDown = event.keyCode === KeyCode.Tab;
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

  const getState = useMemo(() => {
    return visible ? 'open' : 'closed';
  }, [visible]);

  const renderChildren = useMemo(() => {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <section
        role="dialog"
        tabIndex={-1}
        aria-modal={visible}
        ref={modalContent}
        data-state={getState}
        className={cslx(
          preClass,
          {
            [`${preClass}-fullscreen`]: fullScreen,
            [`${preClass}-with-close-button`]: closeButton,
            [`${preClass}-modal-rebound`]: rebound,
            [`${preClass}-rendered`]: rendered
          },
          className
        )}
        {...props}
        onKeyDown={onKeyDown}
      >
        <div
          role="button"
          tabIndex={0}
          className={`${preClass}-hide-tab`}
          aria-hidden="true"
          ref={tabStart}
        />
        {closeButton && <ModalCloseButton onClick={handleClose} />}
        {children}
        <div
          role="button"
          tabIndex={0}
          className={`${preClass}-hide-tab`}
          aria-hidden="true"
          ref={tabEnd}
        />
        <style jsx>{`
          .${preClass} {
            max-width: 100%;
            vertical-align: middle;
            overflow: hidden;
            height: fit-content(20em);
            max-height: ${scroll ? 'calc(100vh - 200px)' : 'inherit'};
            display: flex;
            outline: none;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
            background-color: ${theme.type === 'light'
              ? theme.palette.background
              : theme.palette.accents_1};
            color: ${theme.palette.foreground};
            border-radius: ${theme.radius.lg};
            box-shadow: ${theme.shadows.lg};
            animation-fill-mode: forwards;
            ${stringCss};
          }
          .${preClass}-hide-tab {
            outline: none;
            overflow: hidden;
            width: 0;
            height: 0;
            opacity: 0;
          }
          .${preClass}-fullscreen {
            width: 100%;
            height: 100%;
            max-height: 100%;
          }
          .${preClass}-modal-rebound:not(.${preClass}-fullscreen) {
            animation-duration: 250ms;
            animation-name: rebound;
            animation-timing-function: ease;
            animation-fill-mode: forwards;
          }
          .${preClass}-wrapper-enter:not(.${preClass}-rendered) {
            animation-name: appearance-in;
            animation-duration: 200ms;
            animation-timing-function: ease-in;
            animation-direction: normal;
          }
          .${preClass}-wrapper-leave {
            animation-name: appearance-out;
            animation-duration: 50ms;
            animation-timing-function: ease-out;
          }
          .${preClass}-with-close-button {
            padding-top: ${theme.spacing.lg};
          }
          .${preClass}-fullscreen :global(.${preClass}-close-icon) {
            top: ${theme.spacing.lg};
            right: calc(${theme.spacing.lg} * 0.5);
          }
          .${preClass}-fullscreen :global(.${preClass}-close-icon svg) {
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
      </section>
    );
  }, [rebound, children]);

  return (
    <>
      {animated ? (
        <CSSTransition
          name={`${preClass}-wrapper`}
          visible={visible}
          enterTime={20}
          leaveTime={20}
          clearTime={300}
        >
          {renderChildren}
        </CSSTransition>
      ) : visible ? (
        renderChildren
      ) : null}
    </>
  );
};

export default withDefaults(ModalWrapper, defaultProps);
