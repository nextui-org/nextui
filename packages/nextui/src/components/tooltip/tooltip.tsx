import React, { useEffect, useRef, useState } from 'react';
import withDefaults from '../../utils/with-defaults';
import TooltipContent from './tooltip-content';
import useClickAway from '../../hooks/use-click-away';
import {
  TriggerTypes,
  Placement,
  SimpleColors,
  TooltipTypes,
} from '../../utils/prop-types';

export type TooltipOnVisibleChange = (visible: boolean) => void;

interface Props {
  text: string | React.ReactNode;
  color?: TooltipTypes | string;
  textColor?: SimpleColors | string;
  placement?: Placement;
  visible?: boolean;
  shadow?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  initialVisible?: boolean;
  hideArrow?: boolean;
  trigger?: TriggerTypes;
  enterDelay?: number;
  leaveDelay?: number;
  offset?: number;
  className?: string;
  portalClassName?: string;
  onVisibleChange?: TooltipOnVisibleChange;
}

const defaultProps = {
  initialVisible: false,
  hideArrow: false,
  shadow: true,
  bordered: false,
  rounded: false,
  color: 'default' as TooltipTypes | string,
  textColor: 'default' as SimpleColors | string,
  trigger: 'hover' as TriggerTypes,
  placement: 'top' as Placement,
  enterDelay: 0,
  leaveDelay: 0,
  offset: 12,
  className: '',
  portalClassName: '',
  onVisibleChange: (() => {}) as TooltipOnVisibleChange,
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TooltipProps = Props & typeof defaultProps & NativeAttrs;

const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  initialVisible,
  text,
  offset,
  placement,
  portalClassName,
  enterDelay,
  leaveDelay,
  trigger,
  bordered,
  rounded,
  color,
  textColor,
  shadow,
  className,
  onVisibleChange,
  hideArrow,
  visible: customVisible,
  ...props
}) => {
  const timer = useRef<number>();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const contentProps = {
    color,
    textColor,
    visible,
    shadow,
    offset,
    placement,
    bordered,
    rounded,
    hideArrow,
    parent: ref,
    className: portalClassName,
  };

  const changeVisible = (nextState: boolean) => {
    const clear = () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };
    const handler = (nextState: boolean) => {
      setVisible(nextState);
      onVisibleChange(nextState);
      clear();
    };
    clear();
    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), enterDelay);
      return;
    }
    timer.current = window.setTimeout(() => handler(false), leaveDelay);
  };

  const mouseEventHandler = (next: boolean) =>
    trigger === 'hover' && changeVisible(next);
  const clickEventHandler = () =>
    trigger === 'click' && changeVisible(!visible);

  useClickAway(ref, () => trigger === 'click' && changeVisible(false));

  useEffect(() => {
    if (customVisible === undefined) return;
    changeVisible(customVisible);
  }, [customVisible]);

  return (
    <div
      ref={ref}
      className={`tooltip ${className}`}
      onClick={clickEventHandler}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}
      {...props}
    >
      {children}
      <TooltipContent {...contentProps}>{text}</TooltipContent>
      <style jsx>{`
        .tooltip {
          width: max-content;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(Tooltip, defaultProps);
