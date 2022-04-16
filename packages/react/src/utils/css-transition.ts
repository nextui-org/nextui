import React, { useEffect, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import clsx from '../utils/clsx';

interface Props {
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
  name?: string;
  onExited?: () => void;
  onEntered?: () => void;
}

const defaultProps = {
  visible: false,
  enterTime: 60,
  leaveTime: 60,
  clearTime: 60,
  className: '',
  name: 'transition'
};

export type CSSTransitionProps = Props & typeof defaultProps;

const CSSTransition: React.FC<React.PropsWithChildren<CSSTransitionProps>> = ({
  children,
  className,
  visible,
  enterTime,
  leaveTime,
  clearTime,
  name,
  onExited,
  onEntered,
  ...props
}) => {
  const [classes, setClasses] = useState<string>('');
  const [renderable, setRenderable] = useState<boolean>(visible);

  useEffect(() => {
    const statusClassName = visible ? 'enter' : 'leave';
    const time = visible ? enterTime : leaveTime;

    if (visible && !renderable) {
      setRenderable(true);
    }

    setClasses(`${name}-${statusClassName}`);

    // set class to active
    const timer = setTimeout(() => {
      setClasses(
        `${name}-${statusClassName} ${name}-${statusClassName}-active`
      );
      if (statusClassName === 'leave') {
        onExited?.();
      } else {
        onEntered?.();
      }
      clearTimeout(timer);
    }, time);

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses('');
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);

  if (!React.isValidElement(children) || !renderable) return null;

  return React.cloneElement(children, {
    ...props,
    className: clsx(children.props.className, className, classes)
  });
};

export default withDefaults(CSSTransition, defaultProps);
