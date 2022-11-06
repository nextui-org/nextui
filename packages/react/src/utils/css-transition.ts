import type {FC, ReactNode, RefObject} from "react";

import React, {useEffect, useState, isValidElement, cloneElement} from "react";
import {flushSync} from "react-dom";

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

const CSSTransition: FC<CSSTransitionProps> = (props: CSSTransitionProps) => {
  const {
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
  } = props;

  const [classes, setClasses] = useState<string>("");
  const [renderable, setRenderable] = useState<boolean>(visible);

  useEffect(() => {
    const statusClassName = visible ? "enter" : "leave";
    const time = visible ? enterTime : leaveTime;

    if (visible && !renderable) setRenderable(true);

    flushSync(() => setClasses(`${name}-${statusClassName}`));

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
  useEffect(() => {
    if (!childrenRef?.current) return;

    const classesArr = classes.split(" ");
    const refClassesArr = childrenRef.current.className.split(" ");
    const newRefClassesArr = refClassesArr.filter((item) => !item.includes(name));

    childrenRef.current.className = clsx(newRefClassesArr, classesArr);
  }, [childrenRef, classes]);

  if (!isValidElement(children) || !renderable) return null;

  return cloneElement(children, {
    ...otherProps,
    // @ts-ignore
    className: clsx(children.props.className, className, !childrenRef?.current && classes),
  });
};

export default React.memo(CSSTransition);
