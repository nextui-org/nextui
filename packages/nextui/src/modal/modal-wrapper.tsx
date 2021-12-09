import React, { useEffect, useRef, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import CSSTransition from '../utils/css-transition';
import { isChildElement } from '../utils/collections';
import ModalCloseButton from './modal-close-button';
import { KeyCode } from '../use-keyboard';
import {
  StyledModal,
  StyledModalHideTab,
  ModalVariantsProps
} from './modal.styles';
import cslx from '../utils/clsx';

interface Props {
  visible?: boolean;
  scroll?: boolean;
  rebound?: boolean;
  animated?: boolean;
  fullScreen?: boolean;
  closeButton?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onCloseButtonClick?: () => void;
}

const defaultProps = {
  className: '',
  visible: false,
  rebound: false
};

export type ModalWrapperProps = Props & ModalVariantsProps;

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
  const modalContent = useRef<HTMLDivElement>(null);
  const tabStart = useRef<HTMLDivElement>(null);
  const tabEnd = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true);
      clearTimeout(timer);
    }, 300);
    return () => clearTimeout(timer);
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
      <StyledModal
        role="dialog"
        tabIndex={-1}
        aria-modal={visible}
        ref={modalContent}
        data-state={getState}
        fullScreen={fullScreen}
        scroll={scroll}
        closeButton={closeButton}
        className={cslx(
          preClass,
          `${preClass}--${getState}`,
          {
            [`${preClass}-fullscreen`]: fullScreen,
            [`${preClass}-with-close-button`]: closeButton,
            [`${preClass}-rebound`]: rebound,
            [`${preClass}-rendered`]: rendered
          },
          className
        )}
        {...props}
        onKeyDown={onKeyDown}
      >
        <StyledModalHideTab
          role="button"
          tabIndex={0}
          className={`${preClass}-hide-tab`}
          aria-hidden="true"
          ref={tabStart}
        />
        {closeButton && <ModalCloseButton onClick={handleClose} />}
        {children}
        <StyledModalHideTab
          role="button"
          tabIndex={0}
          className={`${preClass}-hide-tab`}
          aria-hidden="true"
          ref={tabEnd}
        />
      </StyledModal>
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
