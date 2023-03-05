import type {FC, ReactNode, RefObject} from "react";

import React, {useEffect, useLayoutEffect, useState} from "react";
import {clsx} from "@nextui-org/shared-utils";

export interface CSSTransitionProps {
  name?: string;
  isVisible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
  onExited?: () => void;
  onEntered?: () => void;
  children?: ReactNode;
  childrenRef?: RefObject<HTMLElement>;
}

const CSSTransition: FC<CSSTransitionProps> = React.memo(
  ({
    children,
    onExited,
    onEntered,
    className,
    childrenRef,
    enterTime = 60,
    leaveTime = 60,
    clearTime = 60,
    isVisible = false,
    name = "transition",
    ...otherProps
  }) => {
    const [classes, setClasses] = useState<string>("");
    const [statusClassName, setStatusClassName] = useState("");
    const [renderable, setRenderable] = useState<boolean>(isVisible);

    useLayoutEffect(() => {
      const statusClassName = isVisible ? "enter" : "leave";

      if (isVisible && !renderable) setRenderable(true);

      setClasses(`${name}-${statusClassName}`);
      setStatusClassName(statusClassName);

      const time = isVisible ? enterTime : leaveTime;

      // set class to active
      const timer = setTimeout(() => {
        setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`);
        setStatusClassName(`${statusClassName}-active`);
        if (statusClassName === "leave") {
          onExited?.();
        } else {
          onEntered?.();
        }
        clearTimeout(timer);
      }, time);

      // remove classess when animation over
      const clearClassesTimer = setTimeout(() => {
        if (!isVisible) {
          setClasses("");
          setRenderable(false);
        }
        clearTimeout(clearClassesTimer);
      }, time + clearTime);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearClassesTimer);
      };
    }, [isVisible, renderable]);

    // update children ref classes
    useEffect(() => {
      if (!childrenRef?.current) return;

      const classesArr = classes.split(" ");
      const refClassesArr = childrenRef.current.className.split(" ");
      const newRefClassesArr = refClassesArr.filter((item) => !item.includes(name));

      childrenRef.current.className = clsx(newRefClassesArr, classesArr);
    }, [childrenRef, classes]);

    if (!React.isValidElement(children) || !renderable) return null;

    return React.cloneElement(children, {
      ...otherProps,
      // @ts-ignore
      "data-transition": statusClassName,
      className: clsx(children.props.className, className, !childrenRef?.current && classes),
    });
  },
);

CSSTransition.displayName = "NextUI.CSSTransition";

export {CSSTransition};
