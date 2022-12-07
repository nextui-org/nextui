import type {FC, ReactNode, RefObject} from "react";

import React, {useLayoutEffect, useState} from "react";

import clsx from "./clsx";

export interface CSSTransitionProps {
  name?: string;
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
  onExited?: () => void;
  onEntered?: () => void;
  children?: ReactNode;
  childrenRef?: RefObject<HTMLElement>;
}

const CSSTransition: FC<CSSTransitionProps> = ({
  children,
  onExited,
  onEntered,
  className,
  childrenRef,
  enterTime = 60,
  leaveTime = 60,
  clearTime = 60,
  visible = false,
  name = "transition",
  ...otherProps
}) => {
  const [classes, setClasses] = useState<string>("");
  const [renderable, setRenderable] = useState<boolean>(visible);

  useLayoutEffect(() => {
    const statusClassName = visible ? "enter" : "leave";

    if (visible && !renderable) setRenderable(true);

    setClasses(`${name}-${statusClassName}`);

    const time = visible ? enterTime : leaveTime;

    // set class to active
    const timer = setTimeout(() => {
      setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`);
      if (statusClassName === "leave") {
        onExited?.();
      } else {
        onEntered?.();
      }
      clearTimeout(timer);
    }, time);

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses("");
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);

  // update children ref classes
  useLayoutEffect(() => {
    if (!childrenRef?.current) return;

    const classesArr = classes.split(" ");
    const refClassesArr = childrenRef.current.className.split(" ");
    const newRefClassesArr = refClassesArr.filter((item) => !item.includes(name));

    childrenRef.current.className = clsx(newRefClassesArr, classesArr);
  }, [childrenRef, classes]);

  if (!React.isValidElement(children) || !renderable) return null;

  return React.cloneElement(children, {
    ...otherProps,
    className: clsx(children.props.className, className, !childrenRef?.current && classes),
  });
};

export default React.memo(CSSTransition);
