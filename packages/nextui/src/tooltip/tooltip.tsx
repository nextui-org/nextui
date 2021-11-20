import React, { useEffect, useRef, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import TooltipContent from './tooltip-content';
import useClickAway from '../use-click-away';
import useTheme from '../use-theme';
import {
  TriggerTypes,
  Placement,
  SimpleColors,
  TooltipColors
} from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';

export type TooltipOnVisibleChange = (visible: boolean) => void;

interface Props extends DefaultProps {
  content: string | React.ReactNode;
  color?: TooltipColors | string;
  contentColor?: SimpleColors | string;
  placement?: Placement;
  visible?: boolean;
  shadow?: boolean;
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
  rounded: false,
  color: 'default' as TooltipColors | string,
  contentColor: 'default' as SimpleColors | string,
  trigger: 'hover' as TriggerTypes,
  placement: 'top' as Placement,
  enterDelay: 0,
  leaveDelay: 0,
  offset: 12,
  className: '',
  portalClassName: '',
  onVisibleChange: (() => {}) as TooltipOnVisibleChange
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TooltipProps = Props & typeof defaultProps & NativeAttrs;

const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  initialVisible,
  content,
  offset,
  placement,
  portalClassName,
  enterDelay,
  leaveDelay,
  trigger,
  rounded,
  color,
  contentColor,
  shadow,
  className,
  onVisibleChange,
  hideArrow,
  visible: customVisible,
  ...props
}) => {
  const timer = useRef<number>();
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const { stringCss } = getSpacingsStyles(theme, props);

  const contentProps = {
    color,
    contentColor,
    visible,
    shadow,
    offset,
    placement,
    rounded,
    hideArrow,
    parent: ref,
    className: portalClassName,
    stringCss
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
      role="button"
      tabIndex={-1}
      className={`nextui-tooltip-button ${className}`}
      onClick={clickEventHandler}
      onKeyUp={() => mouseEventHandler(true)}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}
      onFocus={() => mouseEventHandler(true)}
      onBlur={() => mouseEventHandler(false)}
      {...props}
    >
      {children}
      <TooltipContent {...contentProps}>{content}</TooltipContent>
      <style jsx>{`
        .nextui-tooltip-button {
          width: max-content;
          display: inherit;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(Tooltip, defaultProps);
